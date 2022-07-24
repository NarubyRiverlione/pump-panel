/* eslint-disable max-len */
import {
  CstEngine, CstHydrant, CstNames, CstSim,
} from '../Cst'
import FireEngine from '../FireEngine'
import Line from '../Line'
import { calcFlow, calcPressure } from './Components/FlowValve.test'

describe('Fire engine init', () => {
  test('Has an empty booster tank', () => {
    const testFireEngine = new FireEngine()
    const { BoosterTank } = testFireEngine
    expect(BoosterTank).not.toBeNull()
    expect(BoosterTank.Name).toBe(CstNames.BoosterTank)
    expect(BoosterTank.Volume).toBe(CstEngine.Tank.Volume)
    expect(BoosterTank.Content).toBe(0)
  })
  test('Start with content in booster tank', () => {
    const startContent = 150
    const engineWithContent = new FireEngine(startContent)
    const { BoosterTank } = engineWithContent
    expect(BoosterTank.Content).toBe(startContent)
  })
  test('Tank content is not changing', () => {
    const startContent = 150
    const engineWithContent = new FireEngine(startContent)
    engineWithContent.Thick()
    expect(engineWithContent.BoosterTank.Content).toBe(startContent)
  })
  test('Has a "tank fill" valve that is input from the Intake manifold', () => {
    const testFireEngine = new FireEngine()
    const { TankFillValve, IntakeManifold } = testFireEngine
    expect(TankFillValve).not.toBeNull()
    expect(TankFillValve.Content).toBe(0)
    expect(TankFillValve.Source).toMatchObject(IntakeManifold)
  })
  test('Has a "tank to pump" valve that output to the Intake manifold', () => {
    const testFireEngine = new FireEngine()
    const { TankToPumpValve, IntakeManifold, BoosterTank } = testFireEngine
    expect(TankToPumpValve).not.toBeNull()
    expect(TankToPumpValve.Content).toBe(0)
    expect(TankToPumpValve.Source).toMatchObject(BoosterTank)
    expect(IntakeManifold.Inputs[1]).toMatchObject(TankToPumpValve)
  })

  test('Intake Connection has no input', () => {
    const testFireEngine = new FireEngine()
    const { IntakeConnection } = testFireEngine
    expect(IntakeConnection.In).toBeNull()
    expect(IntakeConnection.Content).toBe(0)
    expect(testFireEngine.isHydrantConnected).toBeFalsy()
  })
  test('Discharge Connections have no output', () => {
    const testFireEngine = new FireEngine()
    const { DischargeConnections } = testFireEngine
    expect(DischargeConnections[0].Out).toBeNull()
    expect(DischargeConnections[0].Content).toBe(0)
  })
  test('Pump to tank valve is closed', () => {
    const testFireEngine = new FireEngine()
    expect(testFireEngine.TankToPumpValve.isOpen).toBeFalsy()
  })
  test('Intake manifold has "tank to pump" and intake connections as inputs', () => {
    const testFireEngine = new FireEngine()
    const { IntakeManifold, IntakeConnection, TankToPumpValve } = testFireEngine
    expect(IntakeManifold.Inputs[0]).toMatchObject(IntakeConnection)
    expect(IntakeManifold.Inputs[1]).toMatchObject(TankToPumpValve)
  })
  test('Pump has no content, input is intake manifold', () => {
    const testFireEngine = new FireEngine()
    const { IntakeManifold, EnginePump } = testFireEngine
    expect(EnginePump.Content).toBe(0)
    expect(EnginePump.In).toMatchObject(IntakeManifold)
  })
})

describe('Hydrant', () => {
  test('Has initial no hydrant', () => {
    const testFireEngine = new FireEngine()
    expect(testFireEngine.Hydrant).toBeUndefined()
  })

  test('Create hydrant', () => {
    const testFireEngine = new FireEngine()
    testFireEngine.CreateHydrant()
    const { Hydrant } = testFireEngine
    expect(Hydrant?.Name).toBe(CstNames.Hydrant)
    expect(Hydrant?.Content).toBe(CstHydrant.Volume)
  })
})

describe('Intake connection', () => {
  test('Connect to hydrant = Intake connection has hydrant content', () => {
    const testFireEngine = new FireEngine()
    testFireEngine.CreateHydrant()
    testFireEngine.ConnectHydrant()

    const { IntakeConnection, Hydrant } = testFireEngine
    expect(IntakeConnection.In).not.toBeNull()
    expect(IntakeConnection.Content).toBe(Hydrant?.Content)
    expect(testFireEngine.isHydrantConnected).toBeTruthy()
  })
  test('Try connect but not hydrant available  = no connection', () => {
    const testFireEngine = new FireEngine()
    testFireEngine.ConnectHydrant()

    const { IntakeConnection, Hydrant } = testFireEngine
    expect(Hydrant).toBeUndefined()
    expect(IntakeConnection.In).toBeNull()
    expect(IntakeConnection.Content).toBe(0)
    expect(testFireEngine.isHydrantConnected).toBeFalsy()
  })
  test('Disconnect from hydrant = Intake has no content', () => {
    const testFireEngine = new FireEngine()
    testFireEngine.CreateHydrant()
    testFireEngine.ConnectHydrant()
    testFireEngine.DisconnectHydrant()

    const { IntakeConnection } = testFireEngine
    expect(IntakeConnection.In).toBeNull()
    expect(IntakeConnection.Content).toBe(0)
    expect(testFireEngine.isHydrantConnected).toBeFalsy()
  })
})

describe('Fill booster tank', () => {
  it('Open tank fill valve = fill booster tank each Thick', () => {
    const testFireEngine = new FireEngine()
    const { BoosterTank, TankFillValve } = testFireEngine
    testFireEngine.CreateHydrant()
    testFireEngine.ConnectHydrant()

    TankFillValve.Open()
    expect(TankFillValve.Content).toBe(CstEngine.TankFillValve.MaxFlow)
    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(CstEngine.TankFillValve.MaxFlow)

    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(CstEngine.TankFillValve.MaxFlow * 2)
  })

  it.skip('Open tank fill valve more = fill booster tank faster each Thick', () => {
    const testFireEngine = new FireEngine()
    testFireEngine.CreateHydrant()
    testFireEngine.ConnectHydrant()
    const { BoosterTank, TankFillValve } = testFireEngine
    const startOpenBy = 10
    TankFillValve.Open()

    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(startOpenBy)

    const openMore = 15
    TankFillValve.Open()
    const newAdd = startOpenBy + openMore
    testFireEngine.Thick()
    expect(TankFillValve.Content).toBe(newAdd)
    expect(BoosterTank.Content).toBe(startOpenBy + newAdd)

    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(startOpenBy + newAdd * 2)
  })

  it.skip('Close the opened tank fill valve a bit = fill booster tank slower each Thick', () => {
    const testFireEngine = new FireEngine()
    testFireEngine.CreateHydrant()
    testFireEngine.ConnectHydrant()
    const { BoosterTank, TankFillValve } = testFireEngine
    const startOpenBy = 10
    TankFillValve.Open()

    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(startOpenBy)

    const openLess = 2
    TankFillValve.Close()
    const newAdd = startOpenBy - openLess
    testFireEngine.Thick()
    expect(TankFillValve.Content).toBe(newAdd)
    expect(BoosterTank.Content).toBe(startOpenBy + newAdd)

    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(startOpenBy + newAdd * 2)
  })
})

describe('Discharge connections', () => {
  it('Connect Line 1 to discharge', () => {
    const testLine1 = new Line('test discharge line')
    const testFireEngine = new FireEngine()
    testFireEngine.ConnectLine(1, testLine1)
    const { DischargeConnections } = testFireEngine
    expect(DischargeConnections[0].Out).toMatchObject(testLine1)
  })
  it('Disconnect Line 1 from discharge', () => {
    const testLine1 = new Line('test discharge line')
    const testFireEngine = new FireEngine()
    testFireEngine.ConnectLine(1, testLine1)
    testFireEngine.DisconnectLine(1)
    const { DischargeConnections } = testFireEngine
    expect(DischargeConnections[1].Out).toBeNull()
  })
})

describe('Discharging - using Line 1', () => {
  it('Discharge has no content when valve is closed', () => {
    const startBooster = 1000
    const testFireEngine = new FireEngine(startBooster)
    const { DischargeConnections, DischargeValves, BoosterTank } = testFireEngine
    testFireEngine.Thick()
    expect(DischargeValves[0].Content).toBe(0)
    expect(DischargeConnections[0].Content).toBe(0)
    expect(DischargeConnections[0].Pressure).toBe(0)
    expect(BoosterTank.Content).toBe(startBooster)
  })
  it('Discharge  & "tank to pump" valves are full open, but pump is not running ==> no pressure, no content', () => {
    const startBooster = 1000
    const openDischarge = 25
    const lineNr = 3
    const testFireEngine = new FireEngine(startBooster)
    const { DischargeConnections, DischargeValves, TankToPumpValve } = testFireEngine

    testFireEngine.OpenDischarge(lineNr, openDischarge)
    TankToPumpValve.Open()
    expect(DischargeValves[lineNr - 1].Content).toBe(0)
    expect(DischargeConnections[lineNr - 1].Content).toBe(0)
    expect(DischargeConnections[lineNr - 1].Pressure).toBe(0)
  })
  it('Discharge & "tank to pump" valves are full open and pump is full running, but not discharge line is connected ==>  Booster tank is not drained', () => {
    const startBooster = 1000
    const openDischarge = 25
    const lineNr = 4
    const testFireEngine = new FireEngine(startBooster)
    const { DischargeConnections, BoosterTank } = testFireEngine

    testFireEngine.OpenDischarge(lineNr, openDischarge)
    expect(DischargeConnections[lineNr - 1].Out).toBeNull()
    expect(DischargeConnections[lineNr - 1].Pressure).toBe(0)
    expect(DischargeConnections[lineNr - 1].Content).toBe(0)
    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(startBooster)
  })

  it('Discharge & "tank to pump" valves are full open and pump is full running and  discharge line is connected ==> drain tank', () => {
    const startBooster = 1000
    const openDischarge = 100
    const lineNr = 1
    const testFireEngine = new FireEngine(startBooster)
    const {
      TankToPumpValve, DischargeConnections, EnginePump, DischargeValves,
    } = testFireEngine

    testFireEngine.ConnectLine(lineNr, new Line('test line'))
    testFireEngine.OpenDischarge(lineNr, openDischarge)
    testFireEngine.EnginePump.setPressure(CstEngine.Pump.MaxPressure)
    TankToPumpValve.Open()

    expect(EnginePump.Pressure).toBe(CstEngine.Pump.MaxPressure)

    expect(DischargeValves[lineNr - 1].Pressure).toBe(EnginePump.Pressure)
    expect(DischargeConnections[lineNr - 1].Pressure).toBe(EnginePump.Pressure)
  })
  it('Discharge connection & valve  pressures following the opening valve', () => {
    const startBooster = 1000
    const openDischarge = 25
    const closeDischarge = 5
    const lineNr = 1
    const testFireEngine = new FireEngine(startBooster)
    const {
      TankToPumpValve, DischargeConnections, EnginePump, DischargeValves,
    } = testFireEngine

    testFireEngine.ConnectLine(lineNr, new Line('test line'))
    testFireEngine.OpenDischarge(lineNr, openDischarge)
    testFireEngine.EnginePump.setPressure(CstEngine.Pump.MaxPressure)
    TankToPumpValve.Open()

    expect(EnginePump.Pressure).toBe(CstEngine.Pump.MaxPressure)

    expect(DischargeValves[lineNr - 1].Content).toBe(calcFlow(openDischarge))
    expect(DischargeValves[lineNr - 1].Pressure).toBe(calcPressure(openDischarge))
    expect(DischargeConnections[lineNr - 1].Pressure).toBe(calcPressure(openDischarge))

    testFireEngine.CloseDischarge(lineNr, closeDischarge)
    testFireEngine.Thick()
    expect(DischargeValves[lineNr - 1].Content).toBe(calcFlow(openDischarge - closeDischarge))
    expect(DischargeValves[lineNr - 1].Pressure).toBe(calcPressure(openDischarge - closeDischarge))
    expect(DischargeConnections[lineNr - 1].Pressure).toBe(calcPressure(openDischarge - closeDischarge))
  })

  it('Booster tank is drained when output is connected to Discharge & pump is running', () => {
    const startBooster = 1000
    const openDischarge = 25
    const lineNr = 1
    const testFireEngine = new FireEngine(startBooster)
    const {
      BoosterTank, TankToPumpValve, EnginePump,
    } = testFireEngine

    testFireEngine.ConnectLine(lineNr, new Line('test line'))
    testFireEngine.OpenDischarge(lineNr, openDischarge)
    testFireEngine.EnginePump.setPressure(CstEngine.Pump.MaxPressure)
    TankToPumpValve.Open()

    expect(EnginePump.Pressure).toBe(CstEngine.Pump.MaxPressure)

    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(startBooster - calcFlow(openDischarge))
    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(startBooster - calcFlow(openDischarge) * 2)
  })
  it('Drain  Booster tank until empty = empty Connection Line 1', () => {
    const startBooster = 180
    const openDischarge = 100 // = drain maxFlow = 200
    const lineNr = 2
    const testFireEngine = new FireEngine(startBooster)
    const {
      DischargeValves, BoosterTank, DischargeConnections, TankToPumpValve, EnginePump,
    } = testFireEngine
    EnginePump.setPressure(CstEngine.Pump.MaxPressure)
    testFireEngine.ConnectLine(lineNr, new Line('test line'))
    testFireEngine.OpenDischarge(lineNr, openDischarge)
    TankToPumpValve.Open()
    expect(DischargeValves[lineNr - 1].Content).toBe(startBooster)

    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(0)
    expect(DischargeValves[lineNr - 1].Content).toBe(0)
    expect(DischargeConnections[lineNr - 1].Out?.Content).toBe(0)
    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(0)
    expect(DischargeValves[lineNr - 1].Content).toBe(0)
    expect(DischargeConnections[lineNr - 1].Out?.Content).toBe(0)
  })
})

describe('Pump', () => {
  it('Tank to pump open => Pump has booster tank content', () => {
    const startBooster = 1257
    const testFireEngine = new FireEngine(startBooster)
    const { TankToPumpValve, EnginePump, BoosterTank } = testFireEngine
    TankToPumpValve.Open()
    expect(EnginePump.Content).toBe(BoosterTank.Content)
  })
  it('Tank to pump closed => Pump has no content', () => {
    const startBooster = 1257
    const testFireEngine = new FireEngine(startBooster)
    const { TankToPumpValve, EnginePump } = testFireEngine
    TankToPumpValve.Open()
    TankToPumpValve.Close()
    expect(EnginePump.Content).toBe(0)
  })
  it('Connected hydrant -> Pump has content', () => {
    const testFireEngine = new FireEngine()
    testFireEngine.CreateHydrant()
    testFireEngine.ConnectHydrant()
    const { Hydrant, EnginePump } = testFireEngine
    expect(EnginePump.Content).toBe(Hydrant?.Content)
  })
})

describe('Simulator running tests', () => {
  test('Not running after init', () => {
    const testFireEngine = new FireEngine()
    expect(testFireEngine.Running).toBeUndefined()
  })
  test('Running after start', (done) => {
    const testFireEngine = new FireEngine()
    testFireEngine.Start()
    expect(testFireEngine.Running).not.toBeNull()
    setTimeout(() => {
      // wait for 1 thick then cleanup test
      testFireEngine.Stop()
      done()
    }, CstSim.Interval)
  })
  test('Not running after stop', () => {
    const testFireEngine = new FireEngine()
    testFireEngine.Start()
    testFireEngine.Stop()
    expect(testFireEngine.Running).toBeUndefined()
  })
  test('Stop a not running testFireEngine (no crash :)', () => {
    const testFireEngine = new FireEngine()
    testFireEngine.Stop()
    expect(testFireEngine.Running).toBeUndefined()
  })
})
