import React, { useState } from 'react'
import { Row } from 'reactstrap'
import ControlHandle from '../Components/ControlHandle'
// eslint-disable-next-line import/extensions
import ReactRadialGauge from '../Components/Gauge/RadialGauge'

type PropsTypes = {
  dischargeNumber :number
  pressure:number
  color:string
  changedDischarge:(newDischarge:number, dischargeNumber:number)=>void
}
export default function Discharge({
  dischargeNumber, pressure, color, changedDischarge,
}:PropsTypes) {
  const [discharge, setDischarge] = useState(0)

  const LeftClick = () => {
    const newDischarge = discharge + 10 > 100 ? 100 : discharge + 10
    setDischarge(newDischarge)
    changedDischarge(newDischarge, dischargeNumber)
  }
  const RightClick = () => {
    const newDischarge = discharge - 10 < 0 ? 0 : discharge - 10
    setDischarge(newDischarge)
    changedDischarge(newDischarge, dischargeNumber)
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
          value={pressure}
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
            Value={discharge}
            cbOnLeftClick={LeftClick}
            cbOnRightClick={RightClick}
          />
        </div>
      </Row>
    </div>
  )
}