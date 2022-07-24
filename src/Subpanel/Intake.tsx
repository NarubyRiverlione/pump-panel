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
    <div style={{ paddingTop: '1em' }}>
      <Row>
        <Col>
          <Row>
            <TankLevel tankContent={BoosterTank.Content} tankVolume={BoosterTank.Volume} />
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
              Value={TankFillValve.isOpen ? 100 : 0}
              cbOnLeftClick={LeftClickTankFill}
              cbOnRightClick={RightClickTankFill}
            />
          </Row>
          <Row>
            <ControlHandle
              Name="Tank to Pump"
              BorderColor="black"
              Value={TankToPumpValve.isOpen ? 100 : 0}
              cbOnLeftClick={LeftClickTankToPump}
              cbOnRightClick={RightClickTankToPump}
            />
          </Row>
        </Col>
      </Row>

    </div>
  )
})

export default Intake
