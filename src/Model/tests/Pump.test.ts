import Pump from '../Components/Pump'
import MockTank from './mocks/MockTank'

const maxPressure = 450
const maxRPM = 4000

describe('Pump init', () => {
  it('Pump has no content, no input, is in RPM mode', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM)
    expect(testPump.In).toBeNull()
    expect(testPump.Content).toBe(0)
    expect(testPump.Pressure).toBe(0)
    expect(testPump.MaxPressure).toBe(maxPressure)
    expect(testPump.MaxRPM).toBe(maxRPM)
    expect(testPump.isModePressure).toBeFalsy()
  })
  it('Set pressure', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM)
    const setPressure = 56
    testPump.Toggle()
    expect(testPump.isModePressure).toBeTruthy()
    testPump.setPressure(setPressure)
    expect(testPump.Pressure).toBe(setPressure)
    expect(testPump.RPM).toBe(setPressure * testPump.RPMtoPressureRatio)
  })
  it('Set above max pressure', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM)
    testPump.setPressure(maxPressure + 12)
    expect(testPump.Pressure).toBe(maxPressure)
  })
  it('Set RPM', () => {
    const newRPM = 1234
    const testPump = new Pump('test pump', maxPressure, maxRPM)
    testPump.setRPM(newRPM)
    expect(testPump.RPM).toBe(newRPM)
    expect(testPump.Pressure).toBe(newRPM / testPump.RPMtoPressureRatio)
  })
  it('Set RPM above max = maxRPM', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM)
    testPump.setRPM(maxRPM + 23)
    expect(testPump.RPM).toBe(maxRPM)
  })
  it('Pump has input content', () => {
    const mockTank = new MockTank('mock tank', 100, 56)
    const testPump = new Pump('test pump', maxPressure, maxRPM)
    testPump.In = mockTank
    expect(testPump.Content).toBe(mockTank.Content)
  })
  it('Toggle pump mode', () => {
    const testPump = new Pump('test pump', maxPressure, maxRPM)
    testPump.Toggle()
    expect(testPump.isModePressure).toBeTruthy()
  })
})
