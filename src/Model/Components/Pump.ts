import { makeAutoObservable } from 'mobx'
import Item from './Item'

export default class Pump implements Item {
  Name: string
  Pressure: number
  readonly MaxPressure: number
  RPM: number
  readonly MaxRPM: number
  In: Item | null
  isModePressure: boolean

  constructor(name: string, maxPressure: number, maxRPM: number) {
    this.Name = name
    this.In = null
    this.Pressure = 0
    this.MaxPressure = maxPressure
    this.RPM = 0
    this.MaxRPM = maxRPM
    this.isModePressure = false

    makeAutoObservable(this)
  }

  setRPM(newRPM: number) {
    this.RPM = newRPM < this.MaxRPM ? newRPM : this.MaxRPM
    if (this.RPM < 0) this.RPM = 0
    if (!this.isModePressure) this.setPressure(this.RPM / this.RPMtoPressureRatio)
  }
  setPressure(newPressure: number) {
    this.Pressure = newPressure < this.MaxPressure ? newPressure : this.MaxPressure
    // this.Pressure = this.Pressure < 0 ? 0 : this.Pressure
    if (this.isModePressure) this.setRPM(this.Pressure * this.RPMtoPressureRatio)
  }

  get Content() {
    return this.In ? this.In.Content : 0
  }
  get RPMtoPressureRatio() {
    return this.MaxRPM / this.MaxPressure
  }
  Toggle() {
    this.isModePressure = !this.isModePressure
  }
}
