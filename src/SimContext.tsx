import React from 'react'
import { CstEngine } from './Model/Cst'
import FireEngine from './Model/FireEngine'

const simulator = new FireEngine(CstEngine.Tank.Volume * 0.60)
const SimulatorContext = React.createContext<FireEngine>(simulator)
simulator.Start()

type PropsTypes = {
  children:JSX.Element
}

export function SimulatorProvider({ children }:PropsTypes) {
  return (
    <SimulatorContext.Provider value={simulator}>
      { children }
    </SimulatorContext.Provider>
  )
}

const SimContext = () => React.useContext(SimulatorContext)
export default SimContext
