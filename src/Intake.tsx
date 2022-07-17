import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import ControlHandle from './ControlHandle'
import IntakeConnection from './IntakeConnection'
import TankLevel from './TankLevel'

export default function Intake() {
  const [TankFill, setTankFill] = useState(0)
  const [TankToPump, setTankToPump] = useState(0)
  const [TankContent, setTankContent] = useState(100)

  const LeftClickTankFill = () => {
    const newTankFill = TankFill + 20 > 100 ? 100 : TankFill + 20
    setTankFill(newTankFill)
  }
  const RightClickTankFill = () => {
    const newTankFill = TankFill - 20 < 0 ? 0 : TankFill - 20
    setTankFill(newTankFill)
  }
  const LeftClickTankToPump = () => {
    const newTankFill = TankToPump + 20 > 100 ? 100 : TankToPump + 20
    setTankToPump(newTankFill)
  }
  const RightClickTankToPump = () => {
    const newTankFill = TankToPump - 20 < 0 ? 0 : TankToPump - 20
    setTankToPump(newTankFill)
  }

  return (
    <div style={{ paddingTop: '1em' }}>
      <Row>
        <Col>
          <Row>
            <TankLevel TankContent={TankContent} />
          </Row>
          <Row>
            <IntakeConnection />
          </Row>
        </Col>

        <Col>
          <Row>
            <ControlHandle
              Name="Tank fill"
              BorderColor="black"
              Value={TankFill}
              cbOnLeftClick={LeftClickTankFill}
              cbOnRightClick={RightClickTankFill}
            />
          </Row>
          <Row>
            <ControlHandle
              Name="Tank to Pump"
              BorderColor="black"
              Value={TankToPump}
              cbOnLeftClick={LeftClickTankToPump}
              cbOnRightClick={RightClickTankToPump}
            />
          </Row>
        </Col>
      </Row>

    </div>
  )
}
