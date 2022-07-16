import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import Display from 'seven-segment-display'

type PropsTypes = {
  PumpReadout:number
  PumpReadoutUnit:string
}

export default function PumpControls({ PumpReadout, PumpReadoutUnit }:PropsTypes) {
  return (
    <div>
      <Row><h4>Pump Controls</h4></Row>
      <Row>

        <Col>
          <Row>
            <Col>
              <div style={{ width: '100px' }}>
                <Display
                  value={PumpReadout}
                  digitCount={3}
                />
              </div>
            </Col>
            <Col>
              <div style={{
                display: 'flex', justifyContent: 'left', alignItems: 'flex-end', fontWeight: 500,
              }}
              >
                {PumpReadoutUnit}
              </div>
            </Col>
          </Row>
          <Row>
            <Row>
              <div style={{ fontWeight: 500, padding: '1em' }}>
                Mode switch
              </div>
            </Row>
            <Row>
              <Row style={{ display: 'flex', justifyContent: 'center', marginBottom: '1px' }}>
                <Button style={{ width: '100px' }} color="info">RPM</Button>
              </Row>
              <Row style={{ display: 'flex', justifyContent: 'center', marginBottom: '1px' }}>
                <Button style={{ width: '100px' }} color="info">Pressure</Button>
              </Row>
            </Row>
          </Row>
        </Col>

        <Col>
          <Row>
            <div style={{ fontWeight: 500, padding: '1em' }}>
              Setting up / down
            </div>
          </Row>
          <Row style={{ display: 'flex', justifyContent: 'center', marginBottom: '1px' }}>
            <Button style={{ width: '75px', height: '75px' }}><div style={{ fontWeight: 800 }}>+</div></Button>
          </Row>
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Button style={{ width: '75px', height: '75px' }}><div style={{ fontWeight: 800 }}>-</div></Button>
          </Row>

        </Col>

      </Row>
    </div>
  )
}
