import { makeAutoObservable } from 'mobx'
import Item from './Item'

export interface TankInterface extends Item {
  Name: string
  Inside: number
  Volume: number
  AddThisStep: number
  RemoveThisStep: number
  Thick: () => void
}

export default class Tank implements TankInterface {
  readonly Name: string
  Inside: number
  readonly Volume: number
  AddThisStep: number
  RemoveThisStep: number
  ReadoutConsumption: number

  constructor(Name: string, Volume: number, StartContent = 0.0) {
    this.Name = Name
    this.Inside = StartContent
    this.Volume = Volume

    this.AddThisStep = 0.0
    this.RemoveThisStep = 0.0
    this.ReadoutConsumption = 0.0

    makeAutoObservable(this)
  }

  get Content() {
    return this.Inside
  }

  Add() {
    if (this.AddThisStep + this.Inside < this.Volume) {
      this.Inside += this.AddThisStep
    } else {
      // prevent overfill
      this.AddThisStep = 0
      this.Inside = this.Volume
    }
  }

  Remove() {
    if (this.Inside - this.RemoveThisStep > 0) {
      this.Inside -= this.RemoveThisStep
      this.ReadoutConsumption = this.RemoveThisStep
    } else {
      this.ReadoutConsumption = this.Inside
      this.Inside = 0.0
    }
    // save amount thats be remove als readout consumption
    // reset RemoveThisStep so each step multiple systems can add there consumption
    this.RemoveThisStep = 0
  }

  Thick() {
    this.Add()
    this.Remove()

    /* istanbul ignore if  */
    if (this.RemoveThisStep < 0) {
      console.warn(`Tank:${this.Name} had a negative RemoveThisStep :${this.RemoveThisStep}`)
    }
    /* istanbul ignore if  */
    if (this.RemoveThisStep === undefined || Number.isNaN(this.RemoveThisStep)) {
      console.warn(`Tank:${this.Name} RemoveThisStep is not a number : ${this.RemoveThisStep}`)
      //  this.RemoveThisStep = 0
    }
    /* istanbul ignore if  */
    if (this.AddThisStep < 0) {
      console.warn(`Tank:${this.Name} had a negative AddThisStep: ${this.AddThisStep} `)
      //  this.AddThisStep = 0
    }
    /* istanbul ignore if  */
    if (this.Inside === undefined || Number.isNaN(this.Inside)) {
      console.warn(`Tank ${this.Name} contents is not a number: ${this.Inside}`)
    }
  }
}
