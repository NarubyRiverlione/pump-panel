import React, { useState } from 'react'
import {
  Button, Col, Collapse, Row,
} from 'reactstrap'
import { HeaderTxt } from '../Model/Cst'

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
  return (
    <Row>

      <Col md={2} style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>
        Pump panel simulator
      </Col>

      <Col>
        <Collapse isOpen={isOpen}>
          <div className="about">
            { HeaderTxt}
          </div>
        </Collapse>
        <Button className="collapsible" onClick={toggle} style={{ marginBottom: '1rem' }}>Help / About</Button>

      </Col>
    </Row>
  )
}
