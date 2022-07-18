import { useState } from 'react'
import { Row, Col } from 'reactstrap'
import Discharge from './Discharge'
import Intake from './Intake'
import MasterGauge from '../Components/MasterGauge'
import PumpControls from '../Components/PumpControls'
import SimContext from '../SimContext'

export default function PumpPanel() {
  const IntakePressure = 0

  const [DischargePressures, setDischarges] = useState([0, 0, 0, 0])
  const [PumpPressure, setPumpPressure] = useState(0)
  const [PumpRPM, setPumpRPM] = useState(0)
  const [PumpMode, setPumpMode] = useState('Bar')

  const changedDischarge = (dischargeSetpoint:number, dischargeLine:number) => {
    const newDischarges = [...DischargePressures]
    newDischarges[dischargeLine - 1] = (PumpPressure / 100) * dischargeSetpoint
    setDischarges(newDischarges)
  }

  const PumpIncDec = (change:number) => {
    if (PumpMode === 'RPM') {
      setPumpRPM(PumpRPM + change)
      return
    }
    setPumpPressure(PumpPressure + change)
  }
  const Sim = SimContext()
  const { TankFillValve, TankToPumpValve, BoosterTank } = Sim

  return (
    <div>
      {/* Master  */}
      <Row>
        <Col>
          <MasterGauge name="Master Intake" pressure={IntakePressure} />
        </Col>
        <Col>
          <MasterGauge name="Master Discharge Output" pressure={PumpPressure} />
        </Col>
        <Col>
          <PumpControls
            PumpReadout={PumpMode === 'RPM' ? PumpRPM : PumpPressure}
            PumpReadoutUnit={PumpMode}
            ChangePumpMode={((newMode) => { setPumpMode(newMode) })}
            PumpIncDec={PumpIncDec}
          />
        </Col>
      </Row>
      {/* Discharges */}
      <Row style={{ paddingTop: '1em' }}>
        <Col md={2}>
          <Discharge dischargeNumber={1} pressure={DischargePressures[0]} color="yellow" changedDischarge={changedDischarge} />
        </Col>
        <Col md={2}>
          <Discharge dischargeNumber={2} pressure={DischargePressures[1]} color="blue" changedDischarge={changedDischarge} />
        </Col>
        <Col md={2}>
          <Discharge dischargeNumber={3} pressure={DischargePressures[2]} color="red" changedDischarge={changedDischarge} />
        </Col>
        <Col md={2}>
          <Discharge dischargeNumber={4} pressure={DischargePressures[3]} color="green" changedDischarge={changedDischarge} />
        </Col>

        {/* Intake */}
        <Col>
          <Intake />
          {/* TankFillValve={TankFillValve} TankToPumpValve={TankToPumpValve} BoosterTank={BoosterTank} /> */}
        </Col>
      </Row>
    </div>
  )
}
