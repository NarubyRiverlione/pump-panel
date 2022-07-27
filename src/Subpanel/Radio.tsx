import React, { useState } from 'react'
import { Row, Col } from 'reactstrap'
import radio from '../Components/radio.png'
import RadioActions from '../Components/RadioActions'

export default function Radio() {
  const [showSendMsg, setShowSendMsg] = useState(false)
  const [Messages, setMessages] = useState([''])

  const RadioClick = () => {
    setShowSendMsg(!showSendMsg)
  }

  return (
    <div>
      <Row>
        <Col md={10}>
          {showSendMsg ? (
            <div>
              <div style={{ fontSize: '800' }}> Received message</div>
              <br />
              <div>{Messages}</div>
            </div>
          )
            : (
              <div>
                <div style={{ fontSize: '800' }}> Send message</div>
                <br />
                <RadioActions RadioClick={RadioClick} />
              </div>
            ) }
        </Col>
        <Col>
          <img src={radio} alt="radio" onClick={() => RadioClick()} />
        </Col>
      </Row>
    </div>
  )
}
