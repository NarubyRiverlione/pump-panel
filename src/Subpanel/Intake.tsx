import { observer } from 'mobx-react-lite'
import { Col, Row } from 'reactstrap'
import ControlHandle from '../Components/ControlHandle'
import IntakeConnection from '../Components/IntakeConnection'
import TankLevel from '../Components/TankLevel'
import SimContext from '../SimContext'

const Intake = observer(() => {
  const Sim = SimContext()
  const { TankFillValve, TankToPumpValve, BoosterTank } = Sim
  const LeftClickTankFill = () => {
    TankFillValve.Open()
  }
  const RightClickTankFill = () => {
    TankFillValve.Close()
  }
  const LeftClickTankToPump = () => {
    TankToPumpValve.Open()
  }
  const RightClickTankToPump = () => {
    TankToPumpValve.Close()
  }

  return (
    <div style={{ padding: '10px' }}>
      <Row>
        {/* Tank Level */}
        <Col md={4}>
          <TankLevel tankContent={BoosterTank.Content} tankVolume={BoosterTank.Volume} />
        </Col>
        {/* intake connection  */}
        <Col md={4}>
          <IntakeConnection />
        </Col>
        {/* Tank to fill - Tank to pump valves */}

        <Col>
          <ControlHandle
            Name="Tank fill"
            BorderColor="black"
            Value={TankFillValve.isOpen ? 100 : 0}
            cbOnLeftClick={LeftClickTankFill}
            cbOnRightClick={RightClickTankFill}
          />
        </Col>

        <Col>
          <ControlHandle
            Name="Tank to Pump"
            BorderColor="black"
            Value={TankToPumpValve.isOpen ? 100 : 0}
            cbOnLeftClick={LeftClickTankToPump}
            cbOnRightClick={RightClickTankToPump}
          />
        </Col>

      </Row>

    </div>
  )
})

export default Intake
