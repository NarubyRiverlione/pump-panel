import { observer } from 'mobx-react-lite'
import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import Display from 'seven-segment-display'
import SimContext from '../SimContext'

const PumpControls = observer(() => {
  const Sim = SimContext()
  const { EnginePump } = Sim
  const { isModePressure, Pressure, RPM } = EnginePump

  const PumpIncDec = (changeBy:number) => {
    if (isModePressure) { EnginePump.setPressure(Pressure + changeBy); return }
    EnginePump.setRPM(RPM + changeBy)
  }

  return (
    <div>
      <Row><h4>Pump Controls</h4></Row>
      <Row>

        <Col>
          <Row>
            <Col>
              <div style={{ width: '100px' }}>
                <Display
                  value={isModePressure ? Pressure : RPM}
                  digitCount={3}
                />
              </div>
            </Col>
            <Col>
              <div style={{
                display: 'flex', justifyContent: 'left', alignItems: 'flex-end', fontWeight: 500,
              }}
              >
                {isModePressure ? 'Bar' : 'RPM'}
              </div>
            </Col>
          </Row>

          <Row style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
            <Button
              style={{ width: '100px' }}
              color="info"
              onClick={() => EnginePump.Toggle()}
            >
              MODE

            </Button>
          </Row>

        </Col>

        <Col>
          <Row>
            <div style={{ fontWeight: 500, padding: '1em' }}>
              Setting up / down
            </div>
          </Row>
          <Row style={{ display: 'flex', justifyContent: 'center', marginBottom: '1px' }}>
            <Button style={{ width: '75px', height: '75px' }} onClick={() => { PumpIncDec(5) }}>
              <div style={{ fontWeight: 800 }}>+</div>

            </Button>
          </Row>
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ width: '75px', height: '75px' }} onClick={() => { PumpIncDec(-5) }}>
              <div style={{ fontWeight: 800 }}>-</div>

            </Button>
          </Row>

        </Col>

      </Row>
    </div>
  )
})

export default PumpControls
