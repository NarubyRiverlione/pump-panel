import { Container, Row } from 'reactstrap'
import './App.css'
import PumpPanel from './PumpPanel'

function App() {
  return (

    <Container fluid>
      <Row>
        <h1>Pump Panel</h1>
      </Row>
      <PumpPanel />
    </Container>

  )
}

export default App
