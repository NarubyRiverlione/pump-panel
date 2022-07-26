import { makeAutoObservable } from 'mobx'
import Connection from './Components/Connection'
import FlowValve from './Components/FlowValve'
import Manifold from './Components/ManiFold'
import Pump from './Components/Pump'
import Tank from './Components/Tank'
import Valve from './Components/Valve'
import {
  CstEngine, CstHydrant, CstNames, CstSim,
} from './Cst'
import Line from './Line'

// todo own Hydrant type so open / closing hydrant = pump max or off
// todo random hydrant pressure / flow

// todo Radio /event system
// - intake line takes time to lay
// - call for "open hydrant"
// - receive call "charge line X"

// todo readout / UI
// - intake pressure from hydrant to main intake gauge
// - discharge flow
// - discharge in use (nozzle open)
// - total discharge flow ?

// todo beter UI for tank level

// todo pressure / flow loss in lines

export default class FireEngine {
  /*
  Hydrant --> IntakeConnection  --> IntakeManifold
  BoosterTank --> TankToPump --> IntakeManifold

  IntakeManifold --> TankFill --> BoosterTank

  IntakeManifold --> EnginePump --> DischargeValve(x) --> DischargeConnection(x)
  */

  // hydrant has pressure so needs to be a dummy pump
  Hydrant: Pump | undefined
  IntakeConnection: Connection

  IntakeManifold: Manifold

  BoosterTank: Tank
  TankFillValve: Valve
  TankToPumpValve: Valve

  DischargeValves: FlowValve[]
  DischargeConnections: Connection[]

  EnginePump: Pump

  Running?: NodeJS.Timeout // ref setInterval

  constructor(BoosterTankContent = 0) {
    this.Hydrant = undefined
    this.IntakeConnection = new Connection(CstNames.IntakeConnection)
    this.IntakeManifold = new Manifold(CstNames.IntakeManifold)
    this.IntakeManifold.AddInput(this.IntakeConnection)

    this.BoosterTank = new Tank(CstNames.BoosterTank, CstEngine.Tank.Volume, BoosterTankContent)
    this.TankFillValve = new Valve(CstNames.TankFillValve, this.IntakeManifold, CstEngine.TankFillValve.MaxFlow)
    this.TankToPumpValve = new Valve(CstNames.TankToPumpValve, this.BoosterTank)

    this.IntakeManifold.AddInput(this.TankToPumpValve)

    this.EnginePump = new Pump(CstNames.Pump, CstEngine.Pump.MaxPressure, CstEngine.Pump.MaxRPM, CstEngine.Pump.IdleRPM)
    this.EnginePump.In = this.IntakeManifold

    this.DischargeValves = new Array<FlowValve>()
    this.DischargeConnections = new Array<Connection>()
    this.SetupDischarge(1)
    this.SetupDischarge(2)
    this.SetupDischarge(3)
    this.SetupDischarge(4)

    makeAutoObservable(this)
  }

  SetupDischarge(lineNr: number) {
    // make Flow valve for discharge
    const name = `${CstNames.DischargeValveLine} ${lineNr}`
    const maxFlow = CstEngine.Discharges[name].MaxFlow
    this.DischargeValves.push(new FlowValve(name, this.EnginePump, maxFlow))
    // connect flow valve with discharge connector as input
    this.DischargeConnections.push(new Connection(CstNames.DischargeConnectionLine))
    this.DischargeConnections[lineNr - 1].In = this.DischargeValves[lineNr - 1]
  }

  Thick() {
    this.BoosterTank.AddThisStep = this.TankFillValve.Content

    // only discharge when output is connected
    let totalDischarge = 0
    this.DischargeConnections.forEach((discharge) => {
      totalDischarge += discharge.Out ? discharge.Content : 0
    })
    this.BoosterTank.RemoveThisStep = totalDischarge
    this.BoosterTank.Thick()
  }

  Start() {
    this.Running = setInterval(() => {
      this.Thick()
    }, CstSim.Interval)
  }

  Stop() {
    if (this.Running) {
      clearInterval(this.Running)
      this.Running = undefined
    }
  }

  CreateHydrant() {
    const unlimitedSource = new Tank(CstNames.Hydrant, CstHydrant.Volume, CstHydrant.Volume)
    this.Hydrant = new Pump('Hydrant', CstHydrant.Pressure, CstHydrant.Pressure, 100)
    this.Hydrant.In = unlimitedSource
    this.Hydrant.Toggle() // put dummy pump in  pressure mode
    this.Hydrant.setPressure(CstHydrant.Pressure)
  }
  ConnectHydrant() {
    if (!this.Hydrant) return // no hydrant available = always not connected
    this.IntakeConnection.ConnectInput(this.Hydrant)
  }
  DisconnectHydrant() {
    this.IntakeConnection.DisconnectInput()
  }
  get isHydrantConnected() {
    if (!this.Hydrant) return false // no hydrant available = always not connected
    return this.IntakeConnection.In === this.Hydrant
  }

  ConnectLine(lineNr: number, line: Line) {
    this.DischargeConnections[lineNr - 1].ConnectOutput(line)
  }
  DisconnectLine(lineNr: number) {
    this.DischargeConnections[lineNr - 1].DisconnectOutput()
  }

  OpenDischarge(lineNr: number, openBy: number) {
    this.DischargeValves[lineNr - 1].Open(openBy)
  }
  CloseDischarge(lineNr: number, closeBy: number) {
    this.DischargeValves[lineNr - 1].Close(closeBy)
  }
}
