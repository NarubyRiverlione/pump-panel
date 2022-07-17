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
    <svg height={180} width={sizeHandleX * 2 + 10} onMouseDown={(e) => MouseDown(e)}>

      <g data-name="Handle">
        <rect x={40} y={0} width={60} height={25} fill="black" />
        <ellipse
          cx={sizeHandleX + 5}
          cy={30 + sizeHandleY + Value}
          fill="white"
          stroke={BorderColor}
          strokeWidth={5}
          rx={sizeHandleX}
          ry={sizeHandleY}
        />
        <ellipse
          cx={sizeHandleX + 5}
          cy={30 + sizeHandleY + Value}
          fill="none"
          stroke="black"
          strokeWidth={1}
          rx={sizeHandleX + 4}
          ry={sizeHandleY + 4}
        />
        <ellipse
          cx={sizeHandleX + 5}
          cy={30 + sizeHandleY + Value}
          fill="none"
          stroke="white"
          strokeWidth={1}
          rx={sizeHandleX + 5}
          ry={sizeHandleY + 5}
        />
        <text x={20} y={55 + Value}>{Name}</text>

        {/* <line x1={55} y1={5} x2={55} y2={18 + Value} stroke="lavender" strokeWidth={5} /> */}
        <circle cx={68} cy={15} r={10} fill="aliceblue" strokeWidth={1} />
        <rect x={58} y={15} width={15} height={11 + Value} fill="aliceblue" />
        <line x1={75} y1={14} x2={75} y2={26 + Value} stroke="lavender" strokeWidth={5} />

      </g>
    </svg>

  )
}
