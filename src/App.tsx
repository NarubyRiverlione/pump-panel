import { Container, Row } from 'reactstrap'
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
          <PumpPanel />
        </Row>

      </Container>
    </SimulatorProvider>
  )
}

export default App
