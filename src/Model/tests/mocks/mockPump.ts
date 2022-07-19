/* istanbul ignore file */

import Item from '../../Components/Item'
import { PumpInterface } from '../../Components/Pump'

export default class MockPump implements PumpInterface {
  Name: string
  Pressure: number
  readonly MaxPressure: number
  RPM: number
  readonly MaxRPM: number
  In: Item | null
  isModePressure: boolean
  Content: number

  constructor(name: string, maxPressure: number, maxRPM: number) {
    this.Name = name
    this.In = null
    this.Pressure = 0
    this.MaxPressure = maxPressure
    this.RPM = 0
    this.MaxRPM = maxRPM
    this.isModePressure = false
    this.Content = 0
  }

  get RPMtoPressureRatio() {
    return this.MaxRPM / this.MaxPressure
  }
  Toggle() {
    this.isModePressure = !this.isModePressure
  }
}
