import React from 'react'
import { Row, Col } from 'reactstrap'
import Discharge from './Discharge'
import Intake from './Intake'
import MasterGauge from './MasterGauge'
import PumpControls from './PumpControls'

export default function PumpPanel() {
  const IntakePressure = 0
  const PumpPressure = 0
  const discharge1 = 0
  const discharge2 = 0
  const discharge3 = 0
  const discharge4 = 0
  const PumpReadout = 123
  const PumpReadoutUnit = 'bar'

  return (
    <div>
      {/* Master  */}
      <Row>
        <Col>
          <MasterGauge name="Master Intake" pressure={IntakePressure} />
        </Col>
        <Col>
          <MasterGauge name="Master Discharge Output" pressure={PumpPressure} />
        </Col>
        <Col>
          <PumpControls PumpReadout={PumpReadout} PumpReadoutUnit={PumpReadoutUnit} />
        </Col>
      </Row>
      {/* Discharges */}
      <Row>
        <Col>
          <Discharge name="Discharge 1" pressure={discharge1} />
        </Col>
        <Col>
          <Discharge name="Discharge 2" pressure={discharge2} />
        </Col>
        <Col>
          <Discharge name="Discharge 3" pressure={discharge3} />
        </Col>
        <Col>
          <Discharge name="Discharge 4" pressure={discharge4} />
        </Col>
      </Row>
      {/* Intake */}
      <Row>
        <Col>
          <Intake />
        </Col>
      </Row>
    </div>
  )
}
