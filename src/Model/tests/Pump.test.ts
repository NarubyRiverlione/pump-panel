import Pump from '../Components/Pump'
import MockTank from './mocks/MockTank'

const maxPressure = 450
describe('Pump init', () => {
  it('Pump has no content, no input', () => {
    const testPump = new Pump('test pump', maxPressure)
    expect(testPump.In).toBeNull()
    expect(testPump.Content).toBe(0)
    expect(testPump.Pressure).toBe(0)
    expect(testPump.MaxPressure).toBe(maxPressure)
  })
  it('Set pressure', () => {
    const testPump = new Pump('test pump', maxPressure)
    const setPressure = 56
    testPump.setPressure(setPressure)
    expect(testPump.Pressure).toBe(setPressure)
  })
  it('Set above max pressure', () => {
    const testPump = new Pump('test pump', maxPressure)
    testPump.setPressure(maxPressure + 12)
    expect(testPump.Pressure).toBe(maxPressure)
  })
  it('Pump has input content', () => {
    const mockTank = new MockTank('mock tank', 100, 56)
    const testPump = new Pump('test pump', maxPressure)
    testPump.In = mockTank
    expect(testPump.Content).toBe(mockTank.Content)
  })
})
