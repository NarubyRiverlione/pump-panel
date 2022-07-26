type PropsTypes = {
  Width:number
}

export default function Screw({ Width }:PropsTypes) {
  const direction = Math.random() * 3
  return (
    <svg height={Width * 2 + 5} width={Width * 2 + 5}>
      <circle cx={Width + 2} cy={Width + 2} r={Width} stroke="darkgray" strokeWidth="1" fill="gainsboro" />

      <line
        x1={Math.cos(Math.PI * (direction / 4)) * Width + Width + 2}
        y1={Math.sin(Math.PI * (direction / 4)) * Width + Width + 2}
        x2={Math.cos(Math.PI * ((direction + 4) / 4)) * Width + Width + 2}
        y2={Math.sin(Math.PI * ((direction + 4) / 4)) * Width + Width + 2}
        stroke="darkgray"
        strokeWidth="2"
      />

    </svg>
  )
}
