import React from 'react'
import FireEngine from './Model/FireEngine'

const simulator = new FireEngine(0)
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
