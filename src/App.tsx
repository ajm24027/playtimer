import './global.css'
import NewTimerModal from './components/NewTimerModal'
import TimerComp from './components/Timer/Timer'
import {
  Box,
  Center,
  Text,
  Link,
  Image,
  VStack,
  SimpleGrid
} from '@chakra-ui/react'
import { useState } from 'react'
import { TimerConfig } from './types/app-types'



const App = () => {
  const [timers, setTimers] = useState<TimerConfig[]>([])

  const removeTimerFromState = (timerIndex: number) => {
    const newTimers = timers.filter((_timer, index) => index !== timerIndex)
    setTimers(newTimers)
  }

  return (
    <Box
      h="100vh"
      w="auto"
      bgGradient="linear(to-br, #0A0442, #090247, #060230)"
    >
      {timers.length < 4 ? (
        <NewTimerModal
          onModalComplete={(newTimerObj: TimerConfig) => {
            setTimers([...timers, newTimerObj])
          }}
        />
      ) : (
        <></>
      )}

      {timers.length > 0 ? (
        <SimpleGrid
          minChildWidth="300px"
          gap={10}
          height="96%"
          mx={10}
          py={8}
          px={4}
        >
          {timers.map((timer, i) => (
            <TimerComp
              key={i}
              name={timer.name}
              initialTime={timer.initialTime}
              game={timer.game}
              terminateTimer={() => removeTimerFromState(i)}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Center h="95%">
          <VStack>
            <Image h="200px" src="/playtimer_logo.png" />
            <Text fontSize="4xl" color="whiteAlpha.700">
              Press the "+" icon below to get started.
            </Text>
          </VStack>
        </Center>
      )}

      <Center mx={20}>
        <Text as="b" color="rgba(196,241,249, 0.4)" fontSize="xs" mt={2}>
          playtimer created by{' '}
          <Link href="https://anthonyjmedina.com/" textDecoration="underline">
            Anthony Medina
          </Link>
        </Text>
      </Center>
    </Box>
  )
}

export default App
