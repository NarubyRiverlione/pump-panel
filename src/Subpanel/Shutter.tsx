type PropsTypes = {
  Clicked:()=>void
}

export default function Shutter({ Clicked }:PropsTypes) {
  const ShutterParts = []

  for (let y = 0; y < window.innerHeight; y += 50) {
    ShutterParts.push(
      <line x1={5} y1={y} x2={window.innerWidth - 85} y2={y} stroke="darkgrey" strokeWidth="2" />,
    )
  }

  return (
    <svg
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={Clicked}
    >
      <rect
        x={0}
        y={0}
        width={window.innerWidth - 60}
        height="100%"
        stroke="black"
        strokeWidth="5"
        fill="gray"
      />
      <rect
        x={0}
        y={window.innerHeight - 20}
        width={window.innerWidth - 60}
        height={20}
        stroke="black"
        fill="black"
      />
      {ShutterParts.map((part) => part)}
    </svg>
  )
}
