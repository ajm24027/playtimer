import './global.css'
import NewTimerModal from './components/NewTimerModal'
import TimerComp from './components/Timer'
import { Container, SimpleGrid } from '@chakra-ui/react'
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
      <SimpleGrid minChildWidth="27%" spacing={10} mx={10}>
        {timers.map((timer, i) => (
          <TimerComp
            key={i}
            name={timer.title}
            initialTime={timer.initialTime}
            game={timer.game}
          />
        ))}
      </SimpleGrid>
    </>
  )
}

export default App
