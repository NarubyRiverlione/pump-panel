import {
  action, computed, makeObservable, observable,
} from 'mobx'
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

  ValveLine1: FlowValve
  ConnectionLine1: Connection

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

    this.ValveLine1 = new FlowValve(CstNames.DischargeValveLine1, this.EnginePump, CstEngine.Discharges.Line1.MaxFlow)
    this.ConnectionLine1 = new Connection(CstNames.DischargeConnectionLine1)
    this.ConnectionLine1.In = this.ValveLine1

    makeObservable(this, {
      Hydrant: observable,
      IntakeConnection: observable,
      BoosterTank: observable,
      TankFillValve: observable,
      TankToPumpValve: observable,
      EnginePump: observable,
      ValveLine1: observable,
      ConnectionLine1: observable,

      Thick: action,
      Start: action,
      Stop: action,

      CreateHydrant: action,
      ConnectHydrant: action,
      DisconnectHydrant: action,
      isHydrantConnected: computed,

      ConnectLine1: action,
      DisconnectLine1: action,

    })
  }

  Thick() {
    this.BoosterTank.AddThisStep = this.TankFillValve.Content

    // only discharge when output is connected
    const totalDischarge = this.ConnectionLine1.Out ? this.ValveLine1.Content : 0
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
  ConnectLine1(line: Line) {
    this.ConnectionLine1.ConnectOutput(line)
  }
  DisconnectLine1() {
    this.ConnectionLine1.DisconnectOutput()
  }
}
