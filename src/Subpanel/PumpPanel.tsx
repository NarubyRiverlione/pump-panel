import { Row, Col } from 'reactstrap'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import Discharge from './Discharge'
import Intake from './Intake'
import MasterGauge from '../Components/MasterGauge'
import PumpControls from '../Components/PumpControls'
import SimContext from '../SimContext'
import PanelPart from '../Components/PanelPart'
import Radio from './Radio'
import Shutter from './Shutter'

const PumpPanel = observer(() => {
  const Sim = SimContext()
  const { EnginePump, IntakeManifold } = Sim
  const [opening, setOpening] = useState(false)

  return (
    <div>
      {/* PANEL */}
      <div className="Panel">
        <Row>
          {/* LEFT SIDE */}
          <Col md={8}>
            {/* LEFT - TOP : MASTER GAUGES & PUMP */}
            <Row>
              {/* Master  */}
              <Col>
                <PanelPart>
                  <MasterGauge name="Master Intake" pressure={IntakeManifold.Pressure ?? 0} />
                </PanelPart>
              </Col>
              <Col>
                <PanelPart>
                  <MasterGauge name="Master Discharge Output" pressure={EnginePump.Pressure} />
                </PanelPart>
              </Col>
              {/* Pump controls */}
              <Col md={4}>
                <PumpControls />
              </Col>
            </Row>

            {/* LEFT - BOTTOM : DISCHARGES */}
            <Row style={{ paddingTop: '1em' }}>
              <Col>
                <PanelPart>
                  <Discharge dischargeNumber={1} color="yellow" />
                </PanelPart>
              </Col>
              <Col>
                <PanelPart>
                  <Discharge dischargeNumber={2} color="blue" />
                </PanelPart>
              </Col>
              <Col>
                <PanelPart>
                  <Discharge dischargeNumber={3} color="red" />
                </PanelPart>
              </Col>
              <Col>
                <PanelPart>
                  <Discharge dischargeNumber={4} color="green" />
                </PanelPart>
              </Col>
            </Row>

          </Col>

          {/* RIGHT SIDE */ }
          <Col>
            {/* RIGHT - TOP */}
            <Row>
              <Col>
                <PanelPart>
                  <Radio />
                </PanelPart>
              </Col>
            </Row>
            {/* RIGHT - BOTTOM */}
            <Row style={{ paddingTop: '1em' }}>
              {/* Left - Large Discharge */}

              {/* Right - Intake */}
              <Col>
                <PanelPart>
                  <Intake />
                </PanelPart>
              </Col>

            </Row>
          </Col>
        </Row>
      </div>
      {/* SHUTTER */}
      <div className={opening ? 'Shutter-Open Shutter' : 'Shutter'}>
        <Shutter Clicked={() => { setOpening(true) }} />
      </div>

    </div>
  )
})

export default PumpPanel
