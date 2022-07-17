import React from 'react'

type PropsTypes = {
  TankContent:number
}

export default function TankLevel({ TankContent }:PropsTypes) {
  const Level100 = TankContent === 100 ? 'DarkTurquoise' : 'DarkBlue'
  const Level75 = TankContent > 75 ? 'LightGreen' : 'Green '
  const Level50 = TankContent > 50 ? 'Yellow' : 'GoldenRod'
  const Level25 = TankContent > 25 ? 'Red' : 'LightCoral'
  return (
    <div>
      <svg width={130} height={200}>
        <rect x={0} y={0} width={110} height={180} fill="Blue" stroke="white" strokeWidth={2} />

        <rect x={10} y={12} width={90} height={38} fill="none" stroke="white" strokeWidth={1} />
        <circle cx={35} cy={30} r={10} fill={Level100} stroke="black" strokeWidth={2} />
        <text x={60} y={40} stroke="white">****</text>

        <rect x={10} y={52} width={90} height={38} fill="none" stroke="white" strokeWidth={1} />
        <circle cx={35} cy={70} r={10} fill={Level75} stroke="black" strokeWidth={2} />
        <text x={62} y={80} stroke="white">***</text>

        <rect x={10} y={92} width={90} height={38} fill="none" stroke="white" strokeWidth={1} />
        <circle cx={35} cy={110} r={10} fill={Level50} stroke="black" strokeWidth={2} />
        <text x={65} y={120} stroke="white">**</text>

        <rect x={10} y={132} width={90} height={38} fill="none" stroke="white" strokeWidth={1} />
        <circle cx={35} cy={150} r={10} fill={Level25} stroke="black" strokeWidth={2} />
        <text x={68} y={160} stroke="white">*</text>
      </svg>
    </div>
  )
}
