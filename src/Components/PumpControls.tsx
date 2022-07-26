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
      <Row>
        <div style={{
          background: 'black',
          padding: '10px',
        }}
        >
          <div style={{
            padding: '10px',
            border: ' 1px solid red',
            borderRadius: '10%',
          }}
          >

            {/* DISPLAY */}
            <Row>
              <Col md={{ offset: 3, size: 5 }}>
                <div style={{ width: '100px' }}>
                  <Display
                    value={isModePressure ? Pressure : RPM}
                    digitCount={4}
                  />
                </div>
              </Col>
              <Col md={4} style={{ padding: '10px' }}>
                <Row style={{
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                  fontWeight: 500,
                  color: isModePressure ? 'red' : 'grey',
                }}
                >
                  BAR
                </Row>
                <Row style={{
                  display: 'flex',
                  justifyContent: 'left',
                  alignItems: 'center',
                  fontWeight: 500,
                  color: !isModePressure ? 'red' : 'grey',
                }}
                >
                  RPM
                </Row>
              </Col>
            </Row>

            <Row>
              {/* IDLE / ?? */}
              <Col md={4}>
                <Row style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
                  <Button
                    style={{ width: '100px' }}
                    color="danger"
                    onClick={() => EnginePump.setIdle()}
                  >
                    IDLE
                  </Button>
                </Row>
                <Row style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
                  <Button
                    style={{ width: '100px' }}
                    color="primary"
                    onClick={() => EnginePump.Toggle()}
                  >
                    ??
                  </Button>
                </Row>
              </Col>
              {/* PRESET / MODE */}
              <Col md={4}>
                <Row style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
                  <Button
                    style={{ width: '100px' }}
                    color="warning"
                    onClick={() => EnginePump.setMax()}
                  >
                    PRESET
                  </Button>
                </Row>
                <Row style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
                  <Button
                    style={{ width: '100px' }}
                    color="success"
                    onClick={() => EnginePump.Toggle()}
                  >
                    MODE
                  </Button>
                </Row>
              </Col>
              {/* INC / DEC  */}
              <Col md={4}>
                <Row style={{ display: 'flex', justifyContent: 'center', paddingRight: '10px' }}>
                  <Button onClick={() => { PumpIncDec(5) }}>
                    <div style={{ fontWeight: 800 }}>+</div>
                  </Button>
                </Row>

                <Row style={{ padding: '10px' }} />

                <Row style={{ display: 'flex', justifyContent: 'center', paddingRight: '10px' }}>
                  <Button onClick={() => { PumpIncDec(-5) }}>
                    <div style={{ fontWeight: 800 }}>-</div>
                  </Button>
                </Row>
              </Col>

            </Row>
          </div>
        </div>
      </Row>

      <Row style={{ paddingTop: '1em' }}>
        <Col>
          <Row className="PanelPart">Pump RPM</Row>
          <Row className="PanelPart">Pump Temp</Row>
        </Col>
      </Row>
    </div>
  )
})

export default PumpControls
