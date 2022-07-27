import Hydrant from '../../Components/Hydrant'

const maxFlow = 1000
const pressure = 15
describe('Hydrant init', () => {
  it('hydrant is closed, has content', () => {
    const testHydrant = new Hydrant('test', maxFlow, pressure)
    expect(testHydrant.isOpen).toBeFalsy()
    expect(testHydrant.Content).toBe(0)
  })
})

describe('open / close', () => {
  it('open', () => {
    const testHydrant = new Hydrant('test', maxFlow, pressure)
    testHydrant.Open()
    expect(testHydrant.isOpen).toBeTruthy()
    expect(testHydrant.Content).toBe(maxFlow)
    expect(testHydrant.Pressure).toBe(pressure)
  })
  it('close after open', () => {
    const testHydrant = new Hydrant('test', maxFlow, pressure)
    testHydrant.Open()
    testHydrant.Close()
    expect(testHydrant.isOpen).toBeFalsy()
    expect(testHydrant.Content).toBe(0)
  })
})
