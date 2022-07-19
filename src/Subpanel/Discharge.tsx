import { observer } from 'mobx-react-lite'
import { Row } from 'reactstrap'
import ControlHandle from '../Components/ControlHandle'
// eslint-disable-next-line import/extensions
import ReactRadialGauge from '../Components/Gauge/RadialGauge'
import SimContext from '../SimContext'

type PropsTypes = {
  dischargeNumber :number
  color:string
}
const Discharge = observer(({ dischargeNumber, color }:PropsTypes) => {
  const Sim = SimContext()
  const { DischargeValves, DischargeConnections } = Sim

  const LeftClick = () => {
    const openBy = 10
    // const dischargeFlowRate = DischargeValves[dischargeNumber - 1].FlowRate
    // const newDischarge = dischargeFlowRate + openBy > 100 ? 100 : dischargeFlowRate + openBy
    // setDischarge(newDischarge)
    // changedDischarge(newDischarge, dischargeNumber)
    Sim.OpenDischarge(dischargeNumber, openBy)
  }
  const RightClick = () => {
    const closeBy = 10
    // const newDischarge = discharge - 10 < 0 ? 0 : discharge - 10
    // setDischarge(newDischarge)
    // changedDischarge(newDischarge, dischargeNumber)
    Sim.CloseDischarge(dischargeNumber, closeBy)
  }
  return (
    <div style={{
      // border: '5px solid', borderRadius: '20px', borderColor: `${color}`,
      padding: '10px',
    }}
    >
      <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ReactRadialGauge
          units="bar"
          title="Pressure"
          value={DischargeConnections[dischargeNumber - 1].Pressure}
          minValue={0}
          maxValue={50}
          // width={300}
          height={160}
          majorTicks={['0', '10', '20', '30', '40', '50']}
          minorTicks={5}
          valueBox={false}
          animationDuration="1500"
          animationRule="elastic"
          animation
          highlights={[{ from: 10, to: 40, color: 'lightgray' }, { from: 40, to: 50, color: 'gray' }]}
          fontNumbersSize={18}
        />
      </Row>
      <Row>
        <div style={{
          display: 'flex', justifyContent: 'center', textAlign: 'center', padding: '10px',
        }}
        >

          <ControlHandle
            Name={`Discharge ${dischargeNumber}`}
            BorderColor={color}
            Value={DischargeValves[dischargeNumber - 1].FlowRate}
            cbOnLeftClick={LeftClick}
            cbOnRightClick={RightClick}
          />
        </div>
      </Row>
    </div>
  )
})

export default Discharge
