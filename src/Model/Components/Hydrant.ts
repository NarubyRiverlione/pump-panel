import { makeAutoObservable } from 'mobx'
import Item from './Item'

export default class Hydrant implements Item {
  Name: string
  readonly MaxFlow: number
  readonly MaxPressure: number
  isOpen: boolean
  isReady: boolean

  constructor(name: string, maxFlow: number, maxPressure: number) {
    this.Name = name
    this.isOpen = false
    this.isReady = false
    this.MaxFlow = maxFlow
    this.MaxPressure = maxPressure

    makeAutoObservable(this)
  }

  Open() {
    // only open a ready hydrant (caps are remove, line is connected)
    if (!this.isReady) return
    this.isOpen = true
  }
  Close() {
    this.isOpen = false
  }
  // Toggle() {
  //   this.isOpen = !this.isOpen
  // }

  get Content() {
    return this.isOpen ? this.MaxFlow : 0
  }
  get Pressure() {
    return this.isOpen ? this.MaxPressure : 0
  }
}
