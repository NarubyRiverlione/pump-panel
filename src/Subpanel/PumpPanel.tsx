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
  const { EnginePump: { Pressure } } = Sim

  const IntakePressure = 0

  return (
    <div>
      {/* Master  */}
      <Row>
        <Col md={3}>
          <PanelPart>
            <MasterGauge name="Master Intake" pressure={IntakePressure} />
          </PanelPart>
        </Col>
        <Col md={3}>
          <PanelPart>
            <MasterGauge name="Master Discharge Output" pressure={Pressure} />
          </PanelPart>
        </Col>
        <Col md={3}>
          <PumpControls />
        </Col>
        <Col>
          <Row className="PanelPart">Pump RPM</Row>
          <Row className="PanelPart">Pump Temp</Row>
        </Col>
      </Row>

      <Row style={{ paddingTop: '1em' }}>
        {/* Discharges */}
        <Col md={2}>
          <PanelPart>
            <Discharge dischargeNumber={1} color="yellow" />
          </PanelPart>
        </Col>
        <Col md={2}>
          <PanelPart>
            <Discharge dischargeNumber={2} color="blue" />
          </PanelPart>
        </Col>
        <Col md={2}>
          <PanelPart>
            <Discharge dischargeNumber={3} color="red" />
          </PanelPart>
        </Col>
        <Col md={2}>
          <PanelPart>
            <Discharge dischargeNumber={4} color="green" />
          </PanelPart>
        </Col>

        {/* Intake */}
        <Col>
          <Intake />
        </Col>

      </Row>
    </div>
  )
})

export default PumpPanel
