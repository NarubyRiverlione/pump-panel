import { makeAutoObservable } from 'mobx'
import Item from './Item'

export interface PumpInterface extends Item {
  Name: string
  Pressure: number
  readonly MaxPressure: number
  RPM: number
  readonly MaxRPM: number
  In: Item | null
  isModePressure: boolean
}

export default class Pump implements PumpInterface {
  Name: string
  Pressure: number
  readonly MaxPressure: number
  RPM: number
  readonly IdleRPM: number
  readonly MaxRPM: number
  In: Item | null
  isModePressure: boolean

  constructor(name: string, maxPressure: number, maxRPM: number, idleRPM: number) {
    this.Name = name
    this.In = null
    this.Pressure = 0
    this.MaxPressure = maxPressure
    this.RPM = 0
    this.MaxRPM = maxRPM
    this.IdleRPM = idleRPM
    this.isModePressure = false

    makeAutoObservable(this)
  }

  setRPM(newRPM: number) {
    this.RPM = newRPM < this.MaxRPM ? newRPM : this.MaxRPM
    if (this.RPM < this.IdleRPM) this.RPM = this.IdleRPM
    if (!this.isModePressure) this.setPressure((this.RPM - this.IdleRPM) / this.RPMtoPressureRatio)
  }
  setPressure(newPressure: number) {
    this.Pressure = newPressure < this.MaxPressure ? newPressure : this.MaxPressure
    // this.Pressure = this.Pressure < 0 ? 0 : this.Pressures
    if (this.isModePressure) this.setRPM(this.Pressure * this.RPMtoPressureRatio + this.IdleRPM)
  }

  setIdle() {
    this.setRPM(this.IdleRPM)
    this.setPressure(0)
  }
  setMax() {
    this.setRPM(this.MaxRPM)
    this.setPressure(this.MaxPressure)
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
