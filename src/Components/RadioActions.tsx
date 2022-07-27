import React from 'react'
import { CstRadioActions } from '../Model/Cst'

type PropsTypes = {
  RadioClick:()=>void
}

export default function RadioActions({ RadioClick }:PropsTypes) {
  const ActionOpenHydrant = () => {
    RadioClick()
  }
  const ActionChargeLine = () => {
    RadioClick()
  }

  return (
    <div>
      <div className="radioActions" onClick={() => ActionOpenHydrant()}>{CstRadioActions.OpenHydrant }</div>
      <div className="radioActions" onClick={() => ActionChargeLine()}>{CstRadioActions.ChargeLine}</div>

    </div>
  )
}
