import { CstEngine, CstNames } from '../Cst'
import FireEngine from '../FireEngine'
import Line from '../Line'
import { calcFlow } from './Components/FlowValve.test'

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

  test('Has a tank fill valve that is  connected to the Intake Connection', () => {
    const testFireEngine = new FireEngine()
    const { TankFillValve } = testFireEngine
    expect(TankFillValve).not.toBeNull()
    expect(TankFillValve.Content).toBe(0)
    expect(TankFillValve.Source.Name).toBe(CstNames.IntakeConnection)
  })
  test('Intake Connection has no input', () => {
    const testFireEngine = new FireEngine()
    const { IntakeConnection } = testFireEngine
    expect(IntakeConnection.In).toBeNull()
    expect(IntakeConnection.Content).toBe(0)
  })
  test('Discharge Connection has no output', () => {
    const testFireEngine = new FireEngine()
    const { ConnectionLine1 } = testFireEngine
    expect(ConnectionLine1.Out).toBeNull()
    expect(ConnectionLine1.Content).toBe(0)
  })
  test('Pump to tank valve is closed', () => {
    const testFireEngine = new FireEngine()
    expect(testFireEngine.TankToPumpValve.isOpen).toBeFalsy()
  })
  test('Pump has no content, input is tank to pump valve', () => {
    const testFireEngine = new FireEngine()
    const { TankToPumpValve, EnginePump } = testFireEngine
    expect(EnginePump.Content).toBe(0)
    expect(EnginePump.In).toMatchObject(TankToPumpValve)
  })
})

describe('Hydrant', () => {
  test('Has initial no hydrant', () => {
    const testFireEngine = new FireEngine()
    expect(testFireEngine.Hydrant).toBeNull()
  })

  test('Create hydrant', () => {
    const testFireEngine = new FireEngine()
    testFireEngine.CreateHydrant()
    const { Hydrant } = testFireEngine
    expect(Hydrant?.Name).toBe(CstNames.Hydrant)
  })
})

describe('Intake connection', () => {
  test('Connect to hydrant = Intake has hydrant content', () => {
    const testFireEngine = new FireEngine()
    testFireEngine.CreateHydrant()
    testFireEngine.ConnectHydrant()

    const { IntakeConnection, Hydrant } = testFireEngine
    expect(IntakeConnection.In).not.toBeNull()
    expect(IntakeConnection.Content).toBe(Hydrant?.Volume)
  })
  test('Disconnect from hydrant = Intake has no content', () => {
    const testFireEngine = new FireEngine()
    testFireEngine.CreateHydrant()
    testFireEngine.ConnectHydrant()
    testFireEngine.DisconnectHydrant()

    const { IntakeConnection } = testFireEngine
    expect(IntakeConnection.In).toBeNull()
    expect(IntakeConnection.Content).toBe(0)
  })
})

describe('Fill booster tank', () => {
  it('Open tank fill valve = fill booster tank each Thick', () => {
    const testFireEngine = new FireEngine()
    const { BoosterTank, TankFillValve } = testFireEngine
    testFireEngine.CreateHydrant()
    testFireEngine.ConnectHydrant()

    const openBy = 10
    TankFillValve.Open(openBy)

    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(openBy)

    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(openBy * 2)
  })

  it('Open tank fill valve more = fill booster tank faster each Thick', () => {
    const testFireEngine = new FireEngine()
    testFireEngine.CreateHydrant()
    testFireEngine.ConnectHydrant()
    const { BoosterTank, TankFillValve } = testFireEngine
    const startOpenBy = 10
    TankFillValve.Open(startOpenBy)

    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(startOpenBy)

    const openMore = 15
    TankFillValve.Open(openMore)
    const newAdd = startOpenBy + openMore
    testFireEngine.Thick()
    expect(TankFillValve.Content).toBe(newAdd)
    expect(BoosterTank.Content).toBe(startOpenBy + newAdd)

    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(startOpenBy + newAdd * 2)
  })

  it('Close the opened tank fill valve a bit = fill booster tank slower each Thick', () => {
    const testFireEngine = new FireEngine()
    testFireEngine.CreateHydrant()
    testFireEngine.ConnectHydrant()
    const { BoosterTank, TankFillValve } = testFireEngine
    const startOpenBy = 10
    TankFillValve.Open(startOpenBy)

    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(startOpenBy)

    const openLess = 2
    TankFillValve.Close(openLess)
    const newAdd = startOpenBy - openLess
    testFireEngine.Thick()
    expect(TankFillValve.Content).toBe(newAdd)
    expect(BoosterTank.Content).toBe(startOpenBy + newAdd)

    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(startOpenBy + newAdd * 2)
  })
})

describe('Discharge connection', () => {
  it('Connect Line 1 to discharge', () => {
    const testFireEngine = new FireEngine()
    testFireEngine.ConnectLine1(new Line(CstNames.Line1))
    const { ConnectionLine1 } = testFireEngine
    expect(ConnectionLine1.Out?.Name).toBe(CstNames.Line1)
  })
  it('Disconnect Line 1 from discharge', () => {
    const testFireEngine = new FireEngine()
    testFireEngine.ConnectLine1(new Line('test line'))
    testFireEngine.DisconnectLine1()
    const { ConnectionLine1 } = testFireEngine
    expect(ConnectionLine1.Out).toBeNull()
  })
})

describe('Discharging - using Line 1', () => {
  it('Discharge connection has no content when discharge valve is closed', () => {
    const startBooster = 1000
    const testFireEngine = new FireEngine(startBooster)
    const { ConnectionLine1, ValveLine1, BoosterTank } = testFireEngine
    testFireEngine.Thick()
    expect(ValveLine1.Content).toBe(0)
    expect(ConnectionLine1.Content).toBe(0)
    expect(BoosterTank.Content).toBe(startBooster)
  })
  it('Discharge connection has booster tank content when discharge & tank to pump valves are open', () => {
    const startBooster = 1000
    const openDischarge = 25
    const testFireEngine = new FireEngine(startBooster)
    const { ConnectionLine1, ValveLine1, TankToPumpValve } = testFireEngine

    ValveLine1.Open(openDischarge)
    TankToPumpValve.Open()
    expect(ValveLine1.Content).toBe(calcFlow(openDischarge))
    expect(ConnectionLine1.Content).toBe(calcFlow(openDischarge))
  })
  it('Booster tank is not drained when no output is connected to Discharge', () => {
    const startBooster = 1000
    const openDischarge = 25
    const testFireEngine = new FireEngine(startBooster)
    const { ConnectionLine1, ValveLine1, BoosterTank } = testFireEngine

    ValveLine1.Open(openDischarge)
    expect(ConnectionLine1.Out).toBeNull()
    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(startBooster)
  })

  it('Booster tank is drained when output is connected to Discharge', () => {
    const startBooster = 1000
    const openDischarge = 25
    const testFireEngine = new FireEngine(startBooster)
    const { ValveLine1, BoosterTank, TankToPumpValve } = testFireEngine

    testFireEngine.ConnectLine1(new Line('test line'))
    ValveLine1.Open(openDischarge)
    TankToPumpValve.Open()

    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(startBooster - calcFlow(openDischarge))
    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(startBooster - calcFlow(openDischarge) * 2)
  })
  it('Drain  Booster tank  until empty = empty Connection Line 1', () => {
    const startBooster = 180
    const openDischarge = 100 // = drain maxFlow = 200
    const testFireEngine = new FireEngine(startBooster)
    const {
      ValveLine1, BoosterTank, ConnectionLine1, TankToPumpValve,
    } = testFireEngine

    testFireEngine.ConnectLine1(new Line('test line'))
    ValveLine1.Open(openDischarge)
    TankToPumpValve.Open()
    expect(ValveLine1.Content).toBe(startBooster)

    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(0)
    expect(ValveLine1.Content).toBe(0)
    expect(ConnectionLine1.Out?.Content).toBe(0)
    testFireEngine.Thick()
    expect(BoosterTank.Content).toBe(0)
    expect(ValveLine1.Content).toBe(0)
    expect(ConnectionLine1.Out?.Content).toBe(0)
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
})
