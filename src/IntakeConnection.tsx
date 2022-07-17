import React from 'react'

export default function IntakeConnection() {
  return (
    <div>
      <svg width={200} height={200}>
        <text x={30} y={15}>INTAKE</text>
        <circle cx={80} cy={100} r={75} fill="gray" stroke="black" />
        <line x1={12} y1={70} x2={150} y2={120} stroke="darkgrey" strokeWidth={20} />
        {/* <line x1={20} y1={60} x2={160} y2={105} stroke="darkgrey" /> */}
      </svg>
    </div>
  )
}
