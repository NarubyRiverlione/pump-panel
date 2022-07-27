import React, { useState } from 'react'
import { Button, Collapse } from 'reactstrap'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  return (
    <div>

      <h2>Pump panel simulator</h2>
      <Button className="collapsible" onClick={toggle} style={{ marginBottom: '1rem' }}>Help / About</Button>
      <Collapse isOpen={isOpen}>
        <div className="about">
          This simulates the pump panel of fire engine.
          <br />
          Click on the radio icon to send a message.
          <br />
          Left click to pull a handle. Right click to push.
        </div>
      </Collapse>
    </div>
  )
}
