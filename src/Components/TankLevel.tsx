import { observer } from 'mobx-react-lite'

type PropsTypes = {
  tankContent: number
  tankVolume:number
}

const TankLevel = observer(({ tankContent, tankVolume }:PropsTypes) => {
  const BoosterPct = (tankContent / tankVolume) * 100

  const Level100 = BoosterPct === 100 ? 'DarkTurquoise' : 'wheat'// 'DarkBlue'
  const Level75 = BoosterPct >= 75 ? 'LightGreen' : 'wheat'// 'Green '
  const Level50 = BoosterPct >= 50 ? 'Yellow' : 'wheat'// 'GoldenRod'
  const Level25 = BoosterPct >= 25 ? 'Red' : 'wheat'// 'LightCoral'
  return (
    <div>
      <svg width={130} height={150}>
        <rect x={0} y={0} width={110} height={180} fill="Blue" stroke="white" strokeWidth={2} />

        <circle cx={55} cy={30} r={10} fill={Level100} stroke="black" strokeWidth={2} />
        <text x={12} y={40} stroke="white">****</text>
        <text x={70} y={40} stroke="white">****</text>

        <circle cx={55} cy={60} r={10} fill={Level75} stroke="black" strokeWidth={2} />
        <text x={15} y={70} stroke="white">***</text>
        <text x={72} y={70} stroke="white">***</text>

        <circle cx={55} cy={90} r={10} fill={Level50} stroke="black" strokeWidth={2} />
        <text x={20} y={100} stroke="white">**</text>
        <text x={77} y={100} stroke="white">**</text>

        <circle cx={55} cy={120} r={10} fill={Level25} stroke="black" strokeWidth={2} />
        <text x={25} y={130} stroke="white">*</text>
        <text x={82} y={130} stroke="white">*</text>
      </svg>
    </div>
  )
})

export default TankLevel
