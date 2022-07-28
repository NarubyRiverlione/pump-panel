/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CstRadio } from '../Model/Cst'
import SimContext from '../SimContext'

type PropsTypes = {
  RadioClick:()=>void
}

const RadioActions = observer(({ RadioClick }:PropsTypes) => {
  const Sim = SimContext()
  const { StreetHydrant, isHydrantConnected } = Sim

  const ActionHydrant = () => {
    if (!isHydrantConnected) return

    if (StreetHydrant.isOpen) { StreetHydrant.Close() } else { StreetHydrant.Open() }

    RadioClick()
  }

  return (
    <div>
      {isHydrantConnected && (
        <div className="radioActions" onClick={() => ActionHydrant()}>
          {StreetHydrant.isOpen ? CstRadio.Actions.CloseHydrant : CstRadio.Actions.OpenHydrant }
        </div>
      )}
    </div>
  )
})

export default RadioActions
