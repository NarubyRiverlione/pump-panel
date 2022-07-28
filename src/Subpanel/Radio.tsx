/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import radio from '../Components/radio.png'
import RadioActions from '../Components/RadioActions'
import SimContext from '../SimContext'

const Radio = observer(() => {
  const Sim = SimContext()
  const { Messages, RadioBlinker } = Sim

  const [openRadio, setOpenRadio] = useState(false)
  const [sendMsg, setSendMsg] = useState(false)

  const CloseRadio = () => {
    setOpenRadio(false)
    setSendMsg(false)
  }

  const RadioClick = () => {
    // click on closed radio = open radio to see received messages
    if (!openRadio) {
      Sim.ClearNewMsg()
      setOpenRadio(!openRadio)
      return
    }
    // click on opened radio = show radio actions to send
    if (!sendMsg) { setSendMsg(true); return }

    // click on send radio = close radio
    CloseRadio()
  }

  return (
    <div>
      <Row>
        <Col md={10}>
          {(openRadio && !sendMsg) && (
            <div>
              <div style={{ fontWeight: 800 }}>Received messages</div>
              <br />
              <div>{Messages}</div>
            </div>
          )}

          {sendMsg && (
            <div>
              <div style={{ fontWeight: 800 }}>Send a message</div>
              <br />
              <RadioActions RadioClick={CloseRadio} />
            </div>
          ) }
        </Col>

        <Col>
          <img
            src={radio}
            alt="radio"
            className={RadioBlinker ? 'radioNewMsg' : 'radio'}
            onClick={() => RadioClick()}
          />
        </Col>
      </Row>
    </div>
  )
})

export default Radio
