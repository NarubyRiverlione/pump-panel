import {
  makeObservable, observable, action, computed,
} from 'mobx'
import Item from './Item'
import { ValveInterface } from './Valve'

export default class FlowValve implements ValveInterface {
  readonly Name: string
  Source: Item
  Volume: number
  isOpen: boolean
  FlowRate: number

  // volume = max flow rate
  constructor(name: string, source: Item, volume: number) {
    this.Name = name
    this.Source = source
    this.Volume = volume // ?? Number.MAX_SAFE_INTEGER
    this.isOpen = false
    this.FlowRate = 0 // % valve is open

    makeObservable(this, {
      isOpen: observable,
      Source: observable,
      FlowRate: observable,
      Open: action,
      Close: action,
      Content: computed,
    })
  }

  Open(AddFlowRateBy?: number) {
    this.FlowRate += AddFlowRateBy ?? 0
    if (this.FlowRate > 100) this.FlowRate = 100
  }
  Close(RemoveFlowRateBy?: number) {
    this.FlowRate -= RemoveFlowRateBy ?? 0
    if (this.FlowRate < 0) this.FlowRate = 0
  }

  get Content() {
    const calcFlow = (this.Volume / 100) * this.FlowRate
    // limit to source content
    const flow = this.Source.Content >= calcFlow ? calcFlow : this.Source.Content
    return flow
  }
}
