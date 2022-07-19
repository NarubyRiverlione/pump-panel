import FlowValve from '../../Components/FlowValve'
import { CstEngine } from '../../Cst'
import MockPump from '../mocks/mockPump'
import MockTank from '../mocks/MockTank'

const sourceContent = 2000
const maxFlow = 200
const sourceTank = new MockTank('dummy source', 100, sourceContent)
const maxPumpPressure = CstEngine.Pump.MaxPressure
const maxRPM = CstEngine.Pump.MaxRPM
const sourcePump = new MockPump('dummy pump', maxPumpPressure, maxRPM)

export const calcFlow = (setpoint: number) => (maxFlow / 100) * setpoint
export const calcPressure = (setpoint: number) => (maxPumpPressure / 100) * setpoint

let flowValveWithTank: FlowValve
let flowValveWithPump: FlowValve
beforeEach(() => {
  flowValveWithTank = new FlowValve('with Tank input', sourceTank, maxFlow)
  // dummy pump at max pump pressure
  sourcePump.isModePressure = true
  sourcePump.Pressure = maxPumpPressure
  sourcePump.Content = sourceContent
  flowValveWithPump = new FlowValve('with pump input', sourcePump, maxFlow)
})

describe('FlowValve init', () => {
  test('FlowValve starts closed, without output', () => {
    expect(flowValveWithTank.isOpen).toBeFalsy()
    expect(flowValveWithTank.Content).toBe(0)
    expect(flowValveWithTank.Pressure).toBe(0)
  })
  test('FlowValve with input starts closed, without output', () => {
    expect(flowValveWithTank.isOpen).toBeFalsy()
    expect(flowValveWithTank.Content).toBe(0)
    expect(flowValveWithTank.Pressure).toBe(0)
  })
})

describe('FlowValve opening', () => {
  it('open without how much = no change', () => {
    flowValveWithTank.Open()
    expect(flowValveWithTank.FlowRate).toBe(0)
    expect(flowValveWithTank.Content).toBe(0)
    expect(flowValveWithTank.Pressure).toBe(0)
  })
  it('Open 10 %, input is tank without pressure = no output', () => {
    flowValveWithTank.Open(10)
    expect(flowValveWithTank.FlowRate).toBe(10)
    expect(flowValveWithTank.Content).toBe(0)
    expect(flowValveWithTank.Pressure).toBe(0)
  })
  it('Open 10 %, input is running pump  = output with pump pressure', () => {
    flowValveWithPump.Open(10)
    expect(flowValveWithPump.FlowRate).toBe(10)
    expect(flowValveWithPump.Content).toBe(calcFlow(10))
    expect(flowValveWithPump.Pressure).toBe(calcPressure(10))
  })
  it('Open more the 100 % = max flow', () => {
    flowValveWithPump.Open(120)
    expect(flowValveWithPump.FlowRate).toBe(100)
    expect(flowValveWithPump.Content).toBe(maxFlow)
    expect(flowValveWithPump.Pressure).toBe(maxPumpPressure)
  })
  it('open but empty source = no content', () => {
    const emptySourcePump = new MockPump('empty source', 10, 200)
    emptySourcePump.isModePressure = true
    emptySourcePump.Pressure = maxPumpPressure
    emptySourcePump.Content = 0
    const flowValveWithEmptyPump = new FlowValve('with empty pump input', emptySourcePump, maxFlow)

    flowValveWithEmptyPump.Open(7)
    expect(flowValveWithEmptyPump.Content).toBe(0)
  })
  it('open but source less then flow  ==> flow = source content', () => {
    const startContent = 30
    const emptySourcePump = new MockPump('empty source', 10, 200)
    emptySourcePump.isModePressure = true
    emptySourcePump.Pressure = maxPumpPressure
    emptySourcePump.Content = startContent
    const flowValveWittPump = new FlowValve('with  pump input', emptySourcePump, maxFlow)

    flowValveWittPump.Open(100)
    expect(flowValveWittPump.Content).toBe(startContent)
  })
})
describe('FlowValve closing', () => {
  it('close without how much = no change', () => {
    flowValveWithPump.Close()
    expect(flowValveWithPump.FlowRate).toBe(0)
    expect(flowValveWithPump.Content).toBe(0)
  })
  it('Close 17 %', () => {
    const startOpen = 30
    const closeBy = 17
    flowValveWithPump.Open(startOpen)
    flowValveWithPump.Close(closeBy)
    expect(flowValveWithPump.FlowRate).toBe(startOpen - closeBy)
    expect(flowValveWithPump.Content).toBe(calcFlow(startOpen - closeBy))
    expect(flowValveWithPump.Pressure).toBe(calcPressure(startOpen - closeBy))
  })
  it('Close more the 0 = 0 flow', () => {
    flowValveWithPump.Close(2)
    expect(flowValveWithPump.FlowRate).toBe(0)
  })
})
