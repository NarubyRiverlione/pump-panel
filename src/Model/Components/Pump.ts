import Item from './Item'

export default class Pump implements Item {
  Name: string
  Pressure: number
  readonly MaxPressure: number
  In: Item | null

  constructor(name: string, maxPressure: number) {
    this.Name = name
    this.In = null
    this.Pressure = 0
    this.MaxPressure = maxPressure
  }

  setPressure(newPressure: number) {
    this.Pressure = newPressure < this.MaxPressure ? newPressure : this.MaxPressure
    // this.Pressure = this.Pressure < 0 ? 0 : this.Pressure
  }

  get Content() {
    return this.In ? this.In.Content : 0
  }
}
