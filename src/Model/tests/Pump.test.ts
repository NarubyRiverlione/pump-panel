import Pump from '../Components/Pump'
import MockPump from './mocks/mockPump'
import MockTank from './mocks/MockTank'

const maxPressure = 450
const maxRPM = 4000
const idleRPM = 600

const inputPressure = 12
const inputContent = 1000
let testInputWithPressure: MockPump

beforeEach(() => {
  testInputWithPressure = new MockPump('input with pressure', 100, 4000)
  testInputWithPressure.Content = inputContent
  testInputWithPressure.Pressure = inputPressure
})

describe('Pump init', () => {
  it('Pump has no content, no input, is in RPM mode', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    expect(testPump.In).toBeNull()
    expect(testPump.Content).toBe(0)
    expect(testPump.Pressure).toBe(0)
    expect(testPump.MaxPressure).toBe(maxPressure)
    expect(testPump.MaxRPM).toBe(maxRPM)
    expect(testPump.IdleRPM).toBe(idleRPM)
    expect(testPump.isModePressure).toBeFalsy()
    expect(testPump.RPMtoPressureRatio).toBe(testPump.MaxRPM / testPump.MaxPressure)
  })

  it('Pump has input content', () => {
    const mockTank = new MockTank('mock tank', 100, 56)
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    testPump.In = mockTank
    expect(testPump.Content).toBe(mockTank.Content)
  })
  it('Toggle pump mode', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    testPump.In = testInputWithPressure
    expect(testPump.isModePressure).toBeFalsy()
    testPump.Toggle()
    expect(testPump.isModePressure).toBeTruthy()
  })
})
describe('Set RPM', () => {
  it('Set RPM', () => {
    const newRPM = 1234
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    testPump.In = testInputWithPressure
    expect(testPump.Content).not.toBe(0)
    testPump.setRPM(newRPM)
    expect(testPump.RPM).toBe(newRPM)
    expect(testPump.Pressure).toBe((newRPM - idleRPM) / testPump.RPMtoPressureRatio)
  })
  it('Set RPM above max = maxRPM', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    testPump.In = testInputWithPressure
    testPump.setRPM(maxRPM + 23)
    expect(testPump.RPM).toBe(maxRPM)
  })
  it('Prevent bellow idle RPM', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    testPump.setRPM(idleRPM - 1)
    expect(testPump.RPM).toBe(idleRPM)
  })
  it('set idle in rpm mode', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    testPump.setIdle()
    expect(testPump.RPM).toBe(testPump.IdleRPM)
    expect(testPump.Pressure).toBe(0)
  })
  it('set max in rpm mode', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    testPump.In = testInputWithPressure
    testPump.setMax()
    expect(testPump.RPM).toBe(testPump.MaxRPM)
    expect(testPump.Pressure).toBe(maxPressure)
  })
})

describe('Set Pressure', () => {
  it('no input = no pressure, is put in RPM mode', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    const setPressure = 56
    expect(testPump.In).toBeNull()
    testPump.Toggle()

    testPump.setPressure(setPressure)
    expect(testPump.Pressure).toBe(0)
    expect(testPump.isModePressure).toBeFalsy()
    expect(testPump.RPM).toBe(testPump.IdleRPM)
  })
  it('input without content = no pressure, is put in RPM mode', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    testPump.In = new MockPump('without content', 100, 1000)
    expect(testPump.In.Content).toBe(0)
    const setPressure = 56
    testPump.Toggle()

    testPump.setPressure(setPressure)
    expect(testPump.Pressure).toBe(0)
    expect(testPump.isModePressure).toBeFalsy()
    expect(testPump.RPM).toBe(testPump.IdleRPM)
  })
  it('Set pressure, has content without input pressure', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    testPump.In = testInputWithPressure
    testInputWithPressure.Pressure = 0
    const setPressure = 56
    testPump.Toggle()
    expect(testPump.isModePressure).toBeTruthy()
    testPump.setPressure(setPressure)
    expect(testPump.Pressure).toBe(setPressure)
    expect(testPump.RPM).toBe(setPressure * testPump.RPMtoPressureRatio + testPump.IdleRPM)
  })
  it('Set above max pressure', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    testPump.In = testInputWithPressure
    testPump.setPressure(maxPressure + 12)
    expect(testPump.Pressure).toBe(maxPressure)
  })
  it('set idle in pressure mode', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    testPump.Toggle()
    testPump.setIdle()
    expect(testPump.RPM).toBe(testPump.IdleRPM)
    expect(testPump.Pressure).toBe(0)
  })
  it('set max in pressure mode', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    testPump.In = testInputWithPressure
    testPump.Toggle()
    testPump.setMax()
    expect(testPump.RPM).toBe(testPump.MaxRPM)
    expect(testPump.Pressure).toBe(maxPressure)
  })
  it('Has input pressure, needs less rpm for adding', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    testPump.In = testInputWithPressure
    //  expect(testInputWithPressure.Pressure).toBe(inputPressure)
    const setPressure = 56
    testPump.Toggle()
    expect(testPump.isModePressure).toBeTruthy()
    testPump.setPressure(setPressure)
    expect(testPump.Pressure).toBe(setPressure)
    // expect(testPump.In.Pressure).toBe(inputPressure)

    const pressureNeeded = setPressure - inputPressure
    const rpmNeeded = pressureNeeded * testPump.RPMtoPressureRatio
    expect(testPump.RPM).toBe(rpmNeeded + testPump.IdleRPM)
  })
  it('cannot set pressure below intake pressure', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    testPump.In = testInputWithPressure
    const setPressure = inputPressure - 1
    testPump.Toggle()
    expect(testPump.isModePressure).toBeTruthy()
    testPump.setPressure(setPressure)
    expect(testPump.Pressure).toBe(inputPressure)
  })
  it('cannot set pressure below not existing intake pressure', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    testPump.In = new MockTank('mock tank without pressure', 100, 100)
    expect(testPump.In.Pressure).toBe(undefined)
    const setPressure = -10
    testPump.Toggle()
    expect(testPump.isModePressure).toBeTruthy()
    testPump.setPressure(setPressure)
    expect(testPump.Pressure).toBe(0)
  })
  it('set idle without existing intake pressure', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    testPump.In = new MockTank('mock tank without pressure', 100, 100)
    expect(testPump.In.Pressure).toBe(undefined)

    testPump.Toggle()
    testPump.setIdle()
    expect(testPump.Pressure).toBe(0)
    expect(testPump.RPM).toBe(idleRPM)
  })
  it('set idle without  intake', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    expect(testPump.In).toBe(null)

    testPump.Toggle()
    testPump.setIdle()
    expect(testPump.Pressure).toBe(0)
    expect(testPump.RPM).toBe(idleRPM)
  })
})
