export const CstNames = {
  BoosterTank: 'Booster tank',
  IntakeConnection: 'Intake connection',
  TankFillValve: 'Tank Fill',
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
  IntakeValve: {
    MaxFlow: 100,
  },
  Discharges: {
    [`${CstNames.DischargeValveLine} 1`]: { MaxFlow: 200 },
    [`${CstNames.DischargeValveLine} 2`]: { MaxFlow: 200 },
    [`${CstNames.DischargeValveLine} 3`]: { MaxFlow: 200 },
    [`${CstNames.DischargeValveLine} 4`]: { MaxFlow: 500 },
  },
  Pump: { MaxPressure: 50, MaxRPM: 2000 },
}
export const CstSim = {
  Interval: 1000,
}
export const CstHydrant = {
  // ToDo: make hydrant flow rate random
  MaxFlow: 100,
  Volume: 1e6,
}
