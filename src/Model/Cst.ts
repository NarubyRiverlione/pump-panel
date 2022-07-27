export const CstNames = {
  BoosterTank: 'Booster tank',
  IntakeConnection: 'Intake connection',
  IntakeManifold: 'Intake manifold',
  TankFillValve: 'Tank fill',
  Hydrant: 'Hydrant',
  DischargeValveLine: 'Discharge valve',
  DischargeConnectionLine: 'Discharge',
  Line: 'Line',
  Pump: 'Pump',
  TankToPumpValve: 'Tank to pump',
}

export const CstEngine = {
  Tank: {
    Volume: 4000,
  },
  TankFillValve: { MaxFlow: 100 },
  IntakeValve: {
    MaxFlow: 100,
  },
  Discharges: {
    [`${CstNames.DischargeValveLine} 1`]: { MaxFlow: 200 },
    [`${CstNames.DischargeValveLine} 2`]: { MaxFlow: 200 },
    [`${CstNames.DischargeValveLine} 3`]: { MaxFlow: 200 },
    [`${CstNames.DischargeValveLine} 4`]: { MaxFlow: 500 },
  },
  Pump: { MaxPressure: 50.0, MaxRPM: 2000, IdleRPM: 500 },
}
export const CstSim = {
  Interval: 1000,
}
export const CstHydrant = {
  // ToDo: make hydrant flow rate random
  MaxFlow: 100,
  Volume: 1e6,
  Pressure: 10.0,
}

export const CstRadioActions = {
  OpenHydrant: 'Open the hydrant',
  ChargeLine: 'Charge line',
}
