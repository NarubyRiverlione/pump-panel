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
  setPressure(pressureSetpoint: number) {
    // not pressure without input content
    if (!this.In || this.In.Content === 0) {
      this.Pressure = 0
      this.RPM = this.IdleRPM
      this.isModePressure = false
      return
    }
    // pressure max limited
    this.Pressure = pressureSetpoint < this.MaxPressure ? pressureSetpoint : this.MaxPressure
    // pressure min intake pressure (or zero)
    this.Pressure = this.Pressure < (this.In.Pressure ?? 0) ? (this.In.Pressure ?? 0) : this.Pressure

    if (this.isModePressure) {
      const pressureNeeded = pressureSetpoint - (this.In.Pressure ?? 0)
      this.setRPM(pressureNeeded * this.RPMtoPressureRatio + this.IdleRPM)
    }
  }

  // evaluate all conditions
  Thick() {
    this.setRPM(this.RPM)
    this.setPressure(this.Pressure)
  }

  setIdle() {
    this.setRPM(this.IdleRPM)
    this.setPressure(this.In?.Pressure ?? 0)
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
    if (this.isModePressure) { this.setPressure(this.Pressure) }
    // this.setRPM(this.RPM)
  }
}
