import { Col, Container, Row } from 'reactstrap'
import './App.css'
import { SimulatorProvider } from './SimContext'
import Footer from './Subpanel/Footer'
import PumpPanel from './Subpanel/PumpPanel'

function App() {
  return (
    <SimulatorProvider>
      <Container fluid>
        <Row>
          <Col style={{ margin: '2em' }}><PumpPanel /></Col>
        </Row>

        <Row>
          <Footer />
        </Row>
      </Container>
    </SimulatorProvider>
  )
}

export default App
