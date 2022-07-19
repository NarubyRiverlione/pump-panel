export default interface Item {
  readonly Name: string
  Content: number
  Pressure?: number

  Toggle?: () => void
  Thick?: () => void
}
