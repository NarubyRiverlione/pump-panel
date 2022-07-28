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
  // TankFillValve: { MaxFlow: 100 },
  // IntakeValve: {
  //   MaxFlow: 100,
  // },
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
  Name: 'Hydrant',
  // ToDo: make hydrant flow rate random
  MaxFlow: 120,
  MinFlow: 70,
  Pressure: 10.0,
  WaitTimeReady: 2000, // ms
}

export const CstRadio = {
  Actions: {
    OpenHydrant: 'Open the hydrant',
    CloseHydrant: 'Close the hydrant',
    ChargeLine: 'Charge line',
  },
  Messages: {
    HydrantReady: 'Hydrant is ready to open',
  },
}

export const HeaderTxt = `This simulates the pump panel of fire engine.
  
  Left click to pull a handle.  Right click to push.

  The radio blinks if there's a new message.
  Click on the icon to open the radio to receive the message.
  Click again to send a message.

  Click multiple time on the intake to open the cap.
  If the intake is open, click again to connect the yellow intake hose.
  Call over the radio to open the hydrant. Watch the intake pressure gauge
  `
