import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import SimContext from '../SimContext'

const IntakeConnection = observer(() => {
  const Sim = SimContext()
  const { isHydrantConnected } = Sim

  const [Move, setMove] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const MouseDown = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault()

    // open & click = (dis)connect hydrant
    if (isOpen && !isHydrantConnected) {
      Sim.ConnectHydrant()
      return
    }
    if (isOpen && isHydrantConnected) {
      Sim.DisconnectHydrant()
      setIsOpen(false)
      return
    }
    // setIsOpen(false); return }

    const { button } = e
    if (button === 0) setMove(Move + 1)
    if (button === 2) setMove(Move - 1)
    if (button === 0 && Move === 4) {
      setIsOpen(true)
      setMove(0)
    }
  }

  return (
    <div>
      <svg width={200} height={200}>
        <g
          onMouseDown={(e) => MouseDown(e)}

        >
          <text x={30} y={15}>INTAKE</text>
          <circle cx={90} cy={100} r={75} fill="gray" stroke="black" />
          {!isOpen && (
            <rect
              x={0}
              y={90}
              height={20}
              width={180}
              stroke="black"
              fill="darkgrey"
              transform={`rotate(${Move * 45} 90 100)`}
            />
          )}

          {isOpen && (
            <circle cx={90} cy={100} r={60} fill={isHydrantConnected ? 'yellow' : 'lightgrey'} stroke="black" />
          )}

        </g>
      </svg>
    </div>
  )
})

export default IntakeConnection
