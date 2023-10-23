import './global.css'
import NewTimerModal from './components/NewTimerModal'
import TimerComp from './components/Timer'
import { Timer } from './types/app-types'
import { useState } from 'react'

const App = () => {
  const [timers, setTimers] = useState<Timer[]>([])

  // const renderTimer () => {
  //   if (timers.length >= 1) {
  //     return <TimerComp />
  //   }
  // }

  return (
    <>
      <NewTimerModal
        onModalComplete={(newTimerObj: Timer) => {
          setTimers([...timers, newTimerObj])
        }}
      />
    </>
  )
}

export default App
