import './global.css'
import { useEffect, useState, useRef } from 'react'
import { SimpleGrid, Box, Button } from '@chakra-ui/react'

const boosterBox = {
  title: 'Super Awesome Spoils Tournament',
  game: 'The Spoils',
  initialTime: '01:02:30',
  timeAtPause: ''
}

const App = () => {
  const Ref = useRef(null)
  const [timer, setTimer] = useState('00:00:00')
  const [isPaused, setIsPaused] = useState(false)

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date())
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / 1000 / 60 / 60) % 24)
    console.log(total, hours, minutes, seconds)
    console.log('This is the timer', timer)
    return {
      total,
      hours,
      minutes,
      seconds
    }
  }

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e)
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
          ':' +
          (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  }

  const clearTimer = (e) => {
    if (!boosterBox.timeAtPause || timer == '00:00:00') {
      setTimer(boosterBox.initialTime)
    } else {
      setTimer(boosterBox.timeAtPause)
    }

    if (Ref.current) clearInterval(Ref.current)
    const id = setInterval(() => {
      startTimer(e)
    }, 1000)
    Ref.current = id
  }

  const getDeadTime = (timeString: string) => {
    let deadline = new Date()
    console.log('This is the deadline before modification > ', deadline)

    console.log('This is the incoming timeString > ', timeString)
    const arrayFromTimeString = timeString.split(':')
    console.log(
      'This is the outgoing arrayFromTimeString > ',
      arrayFromTimeString
    )
    const hours = parseInt(arrayFromTimeString[0])
    console.log('This is hours ', hours)
    const minutes = parseInt(arrayFromTimeString[1])
    console.log('This is minutes ', minutes)
    const seconds = parseInt(arrayFromTimeString[2])
    console.log('This is seconds ', seconds)

    deadline.setSeconds(deadline.getSeconds() + seconds)
    deadline.setMinutes(deadline.getMinutes() + minutes)
    deadline.setHours(deadline.getHours() + hours)
    console.log('This is the deadline > ', deadline)
    return deadline
  }

  useEffect(() => {
    clearTimer(getDeadTime(boosterBox.initialTime))
  }, [])

  const onClickReset = () => {
    clearTimer(getDeadTime(boosterBox.initialTime))
  }

  const onClickPause = () => {
    boosterBox.timeAtPause = timer
    console.log(Boolean(boosterBox.timeAtPause))
    console.log('This is the time at pause', boosterBox.timeAtPause)
    clearInterval(Ref.current)
    setIsPaused(!isPaused)
  }

  const onClickResume = () => {
    clearTimer(getDeadTime(boosterBox.timeAtPause))
    setIsPaused(!isPaused)
  }

  const renderMoreControls = () => {
    return !isPaused ? (
      <button onClick={onClickPause}>Pause</button>
    ) : (
      <button onClick={onClickResume}>Start</button>
    )
  }

  return (
    <div className="App">
      <h2>{timer}</h2>
      <button onClick={onClickReset}>Reset</button>
      {renderMoreControls()}
    </div>
  )
}

export default App
