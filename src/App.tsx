import './global.css'
import NewTimerModal from './components/NewTimerModal'
import { Timer } from './types/app-types'
import { useState } from 'react'

const App = () => {
  const [timers, setTimers] = useState<Timer[]>([])

  return (
    <>
      <NewTimerModal timers={timers} setTimers={setTimers} />
    </>
  )
}

export default App
