import React, { useState } from 'react'
import {
  Button, Col, Collapse, Row,
} from 'reactstrap'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  return (
    <Row>

      <Col md={2} style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>
        Pump panel simulator
      </Col>

      <Col>
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

      </Col>
    </Row>
  )
}
