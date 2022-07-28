import { Col, Container, Row } from 'reactstrap'
import './App.css'
import { SimulatorProvider } from './SimContext'
import Header from './Subpanel/Header'
import PumpPanel from './Subpanel/PumpPanel'

function App() {
  return (
    <SimulatorProvider>
      <Container fluid>

        <Row>
          <Header />
        </Row>

        <Row>
          {/* <Col md={1} className="FireEngineSides" /> */}
          <Col md={1} className="FireEngineSideShadow" />
          <Col className="Panel"><PumpPanel /></Col>
          <Col md={1} className="FireEngineSides" />
        </Row>

      </Container>
    </SimulatorProvider>
  )
}

export default App
