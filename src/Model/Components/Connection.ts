import {
  action, computed, makeObservable, observable,
} from 'mobx'
import Item from './Item'

export default class Connection implements Item {
  Name: string

  In: Item | null
  Out: Item | null

  constructor(name: string) {
    this.Name = name
    this.In = null
    this.Out = null

    makeObservable(this, {
      In: observable,
      Out: observable,
      Pressure: computed,
      ConnectInput: action,
      DisconnectInput: action,
      ConnectOutput: action,
      DisconnectOutput: action,
    })
  }

  ConnectInput(inputItem: Item | null) {
    this.In = inputItem
  }
  DisconnectInput() {
    this.In = null
  }

  ConnectOutput(outputItem: Item | null) {
    this.Out = outputItem
  }
  DisconnectOutput() {
    this.Out = null
  }

  get Content() {
    return this.In ? this.In.Content : 0
  }
  get Pressure() {
    return this.In ? this.In.Pressure ?? 0 : 0
  }
}
