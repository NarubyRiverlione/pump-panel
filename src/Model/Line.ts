import Connection from './Components/Connection'

export default class Line extends Connection {
  Diameter: number
  Length: number

  constructor(name: string) {
    super(name)
    this.Diameter = 0
    this.Length = 0
  }
}
