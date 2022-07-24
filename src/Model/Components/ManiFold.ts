/* Many to many connection */

import Item from './Item'

export default class Manifold implements Item {
  Name: string
  Inputs: Item[]
  Outputs: Item[

  ]
  constructor(name: string) {
    this.Name = name
    this.Inputs = new Array<Item>()
    this.Outputs = new Array<Item>()
  }

  AddInput(input: Item) {
    this.Inputs.push(input)
  }

  AddOutput(output: Item) {
    this.Outputs.push(output)
  }

  get Content() {
    let totalContent = 0
    if (this.Inputs.length === 0) return 0
    this.Inputs.forEach((input) => { totalContent += input.Content })
    return totalContent
  }

  get Pressure() {
    if (this.Inputs.length === 0) return 0
    const findGreatestPressure = (a: Item, b: Item): number => {
      const firstPressure = a.Pressure ?? 0
      const secondPressure = b.Pressure ?? 0
      return firstPressure > secondPressure ? 1 : -1
    }

    const sortedPressures = this.Inputs.sort((a, b) => findGreatestPressure(a, b))
    return sortedPressures[this.Inputs.length - 1].Pressure
  }
}
