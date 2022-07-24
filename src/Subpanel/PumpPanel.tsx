import { Row, Col } from 'reactstrap'
import { observer } from 'mobx-react-lite'
import Discharge from './Discharge'
import Intake from './Intake'
import MasterGauge from '../Components/MasterGauge'
import PumpControls from '../Components/PumpControls'
import SimContext from '../SimContext'

const PumpPanel = observer(() => {
  const Sim = SimContext()
  const { EnginePump: { Pressure } } = Sim

  const IntakePressure = 0

  return (
    <div>
      {/* Master  */}
      <Row>
        <Col>
          <MasterGauge name="Master Intake" pressure={IntakePressure} />
        </Col>
        <Col>
          <MasterGauge name="Master Discharge Output" pressure={Pressure} />
        </Col>
        <Col>
          <PumpControls />
        </Col>
      </Row>
      {/* Discharges */}
      <Row style={{ paddingTop: '1em' }}>
        <Col md={2}>
          <Discharge dischargeNumber={1} color="yellow" />
        </Col>
        <Col md={2}>
          <Discharge dischargeNumber={2} color="blue" />
        </Col>
        <Col md={2}>
          <Discharge dischargeNumber={3} color="red" />
        </Col>
        <Col md={2}>
          <Discharge dischargeNumber={4} color="green" />
        </Col>

        {/* Intake */}
        <Col>
          <Intake />
          {/* TankFillValve={TankFillValve} TankToPumpValve={TankToPumpValve} BoosterTank={BoosterTank} /> */}
        </Col>
      </Row>
    </div>
  )
})

export default PumpPanel
