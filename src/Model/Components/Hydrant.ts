import Item from './Item'

export default class Hydrant implements Item {
  Name: string
  readonly MaxFlow: number
  readonly Pressure: number
  isOpen: boolean

  constructor(name: string, maxFlow: number, pressure: number) {
    this.Name = name
    this.isOpen = false
    this.MaxFlow = maxFlow
    this.Pressure = pressure
  }

  Open() {
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
}
