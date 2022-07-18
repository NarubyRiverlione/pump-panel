import FlowValve from '../../Components/FlowValve'
import MockTank from '../mocks/MockTank'

const name = 'Test valve'
const sourceContent = 2000
const maxFlow = 200
const source = new MockTank('dummy source', 100, sourceContent)

// eslint-disable-next-line import/prefer-default-export
export const calcFlow = (setpoint: number) => (maxFlow / 100) * setpoint

let flowValve: FlowValve
beforeEach(() => {
  flowValve = new FlowValve(name, source, maxFlow)
})

describe('FlowValve init', () => {
  test('FlowValve starts closed, without output', () => {
    expect(flowValve.isOpen).toBeFalsy()
    expect(flowValve.Content).toBe(0)
    expect(flowValve.Name).toBe(name)
  })
  test('FlowValve with input starts closed, without output', () => {
    expect(flowValve.isOpen).toBeFalsy()
    expect(flowValve.Content).toBe(0)
  })
})

describe('FlowValve opening', () => {
  it('open without how much = no change', () => {
    flowValve.Open()
    expect(flowValve.FlowRate).toBe(0)
    expect(flowValve.Content).toBe(0)
  })
  it('Open 10 %', () => {
    flowValve.Open(10)
    expect(flowValve.FlowRate).toBe(10)
    expect(flowValve.Content).toBe(calcFlow(10))
  })
  it('Open more the 100 % = max flow', () => {
    flowValve.Open(120)
    expect(flowValve.FlowRate).toBe(100)
    expect(flowValve.Content).toBe(maxFlow)
  })
  it('open but empty source = no content', () => {
    const emptySource = new MockTank('empty source', 100, 0)
    const testFlowValve = new FlowValve(name, emptySource, maxFlow)
    testFlowValve.Open(7)
    expect(testFlowValve.Content).toBe(0)
  })
  it('open but source less then flow  ==> flow = source content', () => {
    const drainedSource = new MockTank('empty source', 100, maxFlow - 2)
    const testFlowValve = new FlowValve(name, drainedSource, maxFlow)
    testFlowValve.Open(maxFlow)
    expect(testFlowValve.Content).toBe(maxFlow - 2)
  })
})
describe('FlowValve closing', () => {
  it('close without how much = no change', () => {
    flowValve.Close()
    expect(flowValve.FlowRate).toBe(0)
    expect(flowValve.Content).toBe(0)
  })
  it('Close 17 %', () => {
    const startOpen = 30
    const closeBy = 17
    flowValve.Open(startOpen)
    flowValve.Close(closeBy)
    expect(flowValve.FlowRate).toBe(startOpen - closeBy)
    expect(flowValve.Content).toBe(calcFlow(startOpen - closeBy))
  })
  it('Close more the 0 = 0 flow', () => {
    flowValve.Close(2)
    expect(flowValve.FlowRate).toBe(0)
  })
})
