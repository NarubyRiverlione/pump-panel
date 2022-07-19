import { makeAutoObservable } from 'mobx'
import Connection from './Components/Connection'
import FlowValve from './Components/FlowValve'
import Pump from './Components/Pump'
import Tank from './Components/Tank'
import Valve from './Components/Valve'
import {
  CstEngine, CstHydrant, CstNames, CstSim,
} from './Cst'
import Line from './Line'

export default class FireEngine {
  Hydrant: Tank | null

  BoosterTank: Tank
  TankFillValve: FlowValve
  IntakeConnection: Connection

  DischargeValves: FlowValve[]
  DischargeConnections: Connection[]

  EnginePump: Pump
  TankToPumpValve: Valve

  Running?: NodeJS.Timeout // ref setInterval

  constructor(BoosterTankContent = 0) {
    this.Hydrant = null

    this.IntakeConnection = new Connection(CstNames.IntakeConnection)
    this.BoosterTank = new Tank(CstNames.BoosterTank, CstEngine.Tank.Volume, BoosterTankContent)
    this.TankFillValve = new FlowValve(CstNames.TankFillValve, this.IntakeConnection, CstEngine.IntakeValve.MaxFlow)

    this.TankToPumpValve = new Valve(CstNames.TankToPumpValve, this.BoosterTank)
    this.EnginePump = new Pump(CstNames.Pump, CstEngine.Pump.MaxPressure, CstEngine.Pump.MaxRPM)
    this.EnginePump.In = this.TankToPumpValve

    this.DischargeValves = new Array<FlowValve>()
    this.DischargeConnections = new Array<Connection>()
    this.SetupDischarge(1)
    this.SetupDischarge(2)
    this.SetupDischarge(3)
    this.SetupDischarge(4)

    makeAutoObservable(this)
  }

  SetupDischarge(lineNr: number) {
    const name = `${CstNames.DischargeValveLine} ${lineNr}`
    const maxFlow = CstEngine.Discharges[name].MaxFlow
    this.DischargeValves.push(new FlowValve(name, this.EnginePump, maxFlow))

    this.DischargeConnections.push(new Connection(CstNames.DischargeConnectionLine))
    this.DischargeConnections[lineNr - 1].In = this.DischargeValves[lineNr - 1]
  }

  Thick() {
    this.BoosterTank.AddThisStep = this.TankFillValve.Content

    // only discharge when output is connected
    // const totalDischarge = this.DischargeConnections.Out ? this.DischargeValves.Content : 0
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
    // Todo random hydrant volume
    this.Hydrant = new Tank(CstNames.Hydrant, CstHydrant.Volume, CstHydrant.Volume)
  }
  ConnectHydrant() {
    this.IntakeConnection.ConnectInput(this.Hydrant)
  }
  DisconnectHydrant() {
    this.IntakeConnection.DisconnectInput()
  }
  get isHydrantConnected() {
    return this.IntakeConnection.In === this.Hydrant
  }

  // ToDo: change to Connect(Item) / Disconnect(Item)
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
