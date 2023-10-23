import './global.css'
import NewTimerModal from './components/NewTimerModal'
import TimerComp from './components/Timer'
import { Timer } from './types/app-types'
import { useState } from 'react'

const App = () => {
  const [timers, setTimers] = useState<Timer[]>([])

  return (
    <>
      <NewTimerModal
        onModalComplete={(newTimerObj: Timer) => {
          setTimers([...timers, newTimerObj])
        }}
      />
      {timers.map((timer, i) => (
        <TimerComp
          key={i}
          name={timer.title}
          initialTime={timer.initialTime}
          game={timer.game}
          timeAtPause={timer.timeAtPause}
        />
      ))}
    </>
  )
}

export default App
