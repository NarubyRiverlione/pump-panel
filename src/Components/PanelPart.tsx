import { Row, Col } from 'reactstrap'
import Screw from './Screw'

type PropsTypes = {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

export default function PanelPart({ children }:PropsTypes) {
  return (
    <div className="PanelPart">
      <Row md={1} className="noMarginPadding">
        <Col md={1} className="noMarginPadding"><Screw Width={7} /></Col>
        <Col md={10} />
        <Col md={1} className="noMarginPadding"><Screw Width={7} /></Col>
      </Row>

      <Row>
        <Col md={{ offset: 1, size: 10 }} style={{ padding: '5px', border: '1px solid  lightgrey' }}>
          {children}
        </Col>
        <Col />
      </Row>

      <Row md={1} className="noMarginPadding">
        <Col md={1} className="noMarginPadding"><Screw Width={7} /></Col>
        <Col md={10} />
        <Col md={1} className="noMarginPadding"><Screw Width={7} /></Col>
      </Row>
    </div>
  )
}
