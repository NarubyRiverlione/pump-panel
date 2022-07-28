import Hydrant from '../../Components/Hydrant'

const maxFlow = 1000
const pressure = 15
describe('Hydrant init', () => {
  it('hydrant is closed, has content', () => {
    const testHydrant = new Hydrant('test', maxFlow, pressure)
    expect(testHydrant.isOpen).toBeFalsy()
    expect(testHydrant.Content).toBe(0)
    expect(testHydrant.isReady).toBeFalsy()
  })
})

describe('open / close', () => {
  it('open a ready hydrant', () => {
    const testHydrant = new Hydrant('test', maxFlow, pressure)
    testHydrant.isReady = true
    testHydrant.Open()
    expect(testHydrant.isOpen).toBeTruthy()
    expect(testHydrant.Content).toBe(maxFlow)
    expect(testHydrant.Pressure).toBe(pressure)
  })
  it('a not ready hydrant cannot be opened', () => {
    const testHydrant = new Hydrant('test', maxFlow, pressure)
    expect(testHydrant.isReady).toBeFalsy()
    testHydrant.Open()
    expect(testHydrant.isOpen).toBeFalsy()
    expect(testHydrant.Content).toBe(0)
  })
  it('close after open', () => {
    const testHydrant = new Hydrant('test', maxFlow, pressure)
    testHydrant.Open()
    testHydrant.Close()
    expect(testHydrant.isOpen).toBeFalsy()
    expect(testHydrant.Content).toBe(0)
  })
})
