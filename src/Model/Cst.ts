export const CstNames = {
  BoosterTank: 'Booster tank',
  IntakeConnection: 'Intake connection',
  TankFillValve: 'Tank Fill',
  Hydrant: 'Hydrant',
  DischargeValveLine1: 'Discharge valve 1',
  DischargeConnectionLine1: 'Discharge 1',
  Line1: 'Line 1',
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
    Line1: { MaxFlow: 200 },
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
