import React from 'react'

type PropsTypes = {
  Name:string,
  BorderColor:string,
  Value:number,
  cbOnLeftClick:()=>void,
  cbOnRightClick:()=>void
}

export default function ControlHandle({
  Name, BorderColor, Value, cbOnLeftClick, cbOnRightClick,
}:PropsTypes) {
  const sizeHandleX = 60
  const sizeHandleY = 20

  const MouseDown = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault()
    const { button } = e
    if (button === 0) cbOnLeftClick()
    if (button === 2) cbOnRightClick()
  }
  return (
    <svg height={200} width={sizeHandleX * 2 + 10} onMouseDown={(e) => MouseDown(e)}>

      <g data-name="Handle">
        <rect x={45} y={0} width={50} height={15} fill="black" />
        <ellipse
          cx={sizeHandleX + 5}
          cy={20 + sizeHandleY + Value}
          fill="white"
          stroke={BorderColor}
          strokeWidth={5}
          rx={sizeHandleX}
          ry={sizeHandleY}

        />
        <text x={20} y={45 + Value}>{Name}</text>

        {/* <line x1={55} y1={5} x2={55} y2={18 + Value} stroke="lavender" strokeWidth={5} /> */}
        <line x1={75} y1={5} x2={75} y2={18 + Value} stroke="lavender" strokeWidth={5} />
        <rect x={57} y={5} width={15} height={12 + Value} fill="aliceblue" />

      </g>
    </svg>

  )
}
