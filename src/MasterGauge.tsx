import React from 'react'
import { Row } from 'reactstrap'
// eslint-disable-next-line import/extensions
import ReactRadialGauge from './Gauge/RadialGauge'

type PropsTypes = {
  name:string
  pressure:number
}
export default function MasterGauge({ name, pressure }:PropsTypes) {
  return (
    <div>
      <Row>
        <h4>{name}</h4>
      </Row>
      <Row>
        <ReactRadialGauge
          units="bar"
          title="Pressure"
          value={pressure}
          minValue={0}
          maxValue={50}
          majorTicks={['0', '10', '20', '30', '40', '50']}
          minorTicks={5}
          valueBox={false}
        />
      </Row>
    </div>
  )
}
