import Manifold from '../Components/ManiFold'
import MockPump from './mocks/mockPump'
import MockTank from './mocks/MockTank'

describe('Manifold init', () => {
  it('No inputs, no outputs', () => {
    const testManifold = new Manifold('test')
    expect(testManifold.Inputs).toBeDefined()
    expect(testManifold.Inputs.length).toBe(0)
    expect(testManifold.Outputs).toBeDefined()
    expect(testManifold.Outputs.length).toBe(0)

    expect(testManifold.Content).toBe(0)
    expect(testManifold.Pressure).toBe(0)
  })
})
describe('Add in & outputs', () => {
  it('Add input', () => {
    const testManifold = new Manifold('test')
    const testIn = new MockTank('test in', 100)
    testManifold.AddInput(testIn)
    expect(testManifold.Inputs.length).toBe(1)
    expect(testManifold.Inputs[0]).toMatchObject(testIn)
  })
  it('Add output', () => {
    const testManifold = new Manifold('test')
    const testOut = new MockTank('test out', 100)
    testManifold.AddOutput(testOut)
    expect(testManifold.Outputs.length).toBe(1)
    expect(testManifold.Outputs[0]).toMatchObject(testOut)
  })
})

describe('Content', () => {
  it('content = = sum inputs', () => {
    const testManifold = new Manifold('test')
    const startContent1 = 20
    const testIn1 = new MockTank('test in 01', 100, startContent1)
    testManifold.AddInput(testIn1)
    const startContent2 = 56
    const testIn2 = new MockTank('test in 02 ', 100, startContent2)
    testManifold.AddInput(testIn2)

    expect(testManifold.Content).toBe(startContent1 + startContent2)
  })
})

describe('Pressure', () => {
  it('1 input -> pressure = pressure of item', () => {
    const testManifold = new Manifold('test')
    const pressure1 = 20
    const testIn1 = new MockPump('test in 01', 100, 200)
    testIn1.Pressure = pressure1
    testManifold.AddInput(testIn1)
    expect(testManifold.Pressure).toBe(pressure1)
  })
  it('first > second input pressure =  pressure is first', () => {
    const testManifold = new Manifold('test')
    const pressure1 = 65
    const testIn1 = new MockPump('test in 01', 100, 200)
    testIn1.Pressure = pressure1
    testManifold.AddInput(testIn1)

    const pressure2 = 3
    const testIn2 = new MockPump('test in 02', 100, 200)
    testIn2.Pressure = pressure2
    testManifold.AddInput(testIn2)

    expect(testManifold.Pressure).toBe(pressure1)
  })
  it('first < second input pressure =  pressure is second', () => {
    const testManifold = new Manifold('test')
    const pressure1 = 35
    const testIn1 = new MockPump('test in 01', 100, 200)
    testIn1.Pressure = pressure1
    testManifold.AddInput(testIn1)

    const pressure2 = 79
    const testIn2 = new MockPump('test in 02', 100, 200)
    testIn2.Pressure = pressure2
    testManifold.AddInput(testIn2)

    expect(testManifold.Pressure).toBe(pressure2)
  })

  it('first is unpressured tank, second pump = pressure is pump input', () => {
    const testManifold = new Manifold('test')

    const testIn1 = new MockTank('test in 01', 100)
    testManifold.AddInput(testIn1)

    const pressure2 = 3
    const testIn2 = new MockPump('test in 02', 100, 200)
    testIn2.Pressure = pressure2
    testManifold.AddInput(testIn2)

    expect(testManifold.Pressure).toBe(pressure2)
  })
  it('first is pump, second unpressured tank, second  = pressure is pump input', () => {
    const testManifold = new Manifold('test')

    const pressure1 = 3
    const testIn1 = new MockPump('test in 02', 100, 200)
    testIn1.Pressure = pressure1
    testManifold.AddInput(testIn1)

    const testIn2 = new MockTank('test in 01', 100)
    testManifold.AddInput(testIn2)

    expect(testManifold.Pressure).toBe(pressure1)
  })
})
