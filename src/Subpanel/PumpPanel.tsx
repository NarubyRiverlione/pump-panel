import { Row, Col } from 'reactstrap'
import { observer } from 'mobx-react-lite'
import Discharge from './Discharge'
import Intake from './Intake'
import MasterGauge from '../Components/MasterGauge'
import PumpControls from '../Components/PumpControls'
import SimContext from '../SimContext'
import PanelPart from '../Components/PanelPart'

const PumpPanel = observer(() => {
  const Sim = SimContext()
  const { EnginePump, IntakeManifold } = Sim

  return (
    <div>
      <Row>
        {/* LEFT SIDE */}
        <Col md={7}>
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
  )
})

export default PumpPanel
