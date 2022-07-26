import Pump from '../Components/Pump'
import MockTank from './mocks/MockTank'

const maxPressure = 450
const maxRPM = 4000
const idleRPM = 600

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
    testPump.Toggle()
    expect(testPump.isModePressure).toBeTruthy()
  })
})
describe('Set RPM', () => {
  it('Set RPM', () => {
    const newRPM = 1234
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    testPump.setRPM(newRPM)
    expect(testPump.RPM).toBe(newRPM)
    expect(testPump.Pressure).toBe((newRPM - idleRPM) / testPump.RPMtoPressureRatio)
  })
  it('Set RPM above max = maxRPM', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
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
    testPump.setMax()
    expect(testPump.RPM).toBe(testPump.MaxRPM)
    expect(testPump.Pressure).toBe(maxPressure)
  })
})

describe('Set Pressure', () => {
  it('Set pressure', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
    const setPressure = 56
    testPump.Toggle()
    expect(testPump.isModePressure).toBeTruthy()
    testPump.setPressure(setPressure)
    expect(testPump.Pressure).toBe(setPressure)
    expect(testPump.RPM).toBe(setPressure * testPump.RPMtoPressureRatio + testPump.IdleRPM)
  })
  it('Set above max pressure', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM, idleRPM)
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
    testPump.Toggle()
    testPump.setMax()
    expect(testPump.RPM).toBe(testPump.MaxRPM)
    expect(testPump.Pressure).toBe(maxPressure)
  })
})
