import {
  Center,
  VStack,
  HStack,
  Button,
  Box,
  useDisclosure
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { IncomingTimerProps, PhaseNavProps } from '../../types/app-types'
import { GameKey, timerStyles } from './timerStyles'
import { useTimer } from './useTimer'
import { Modal } from '../Modal'
import TimingPhase from '../ModalSteps/TimingPhase'
import alarm from '../Timer/electronic-alarm-clock-151927.mp3'

const TimerComp = ({
  name,
  initialTime,
  game,
  terminateTimer
}: IncomingTimerProps) => {
  const {
    value,
    isExpired,
    isPaused,
    onPause,
    onReset,
    onResume,
    changeTime,
    currentOptions
  } = useTimer(initialTime)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onOpenChangeTime = () => {
    onPause()
    onOpen()
  }

  const onChangeTime: PhaseNavProps['onClickNext'] = (value) => {
    changeTime(value.initialTime!)
    onClose()
  }

  const renderControls = () => {
    const resetButton = (
      <Button colorScheme="orange" w="100%" onClick={onReset}>
        Reset
      </Button>
    )

    if (isExpired) {
      return resetButton
    }
    return (
      <HStack spacing={4} w="100%">
        {resetButton}
        {!isPaused ? (
          <Button colorScheme="yellow" w="100%" onClick={onPause}>
            Pause
          </Button>
        ) : (
          <Button colorScheme="green" w="100%" onClick={onResume}>
            Start
          </Button>
        )}
        <Button colorScheme="cyan" w="100%" onClick={onOpenChangeTime}>
          Change
        </Button>
      </HStack>
    )
  }

  const renderTimer = (game: GameKey) => {
    const gameData = timerStyles[game]
    const { backgroundImage, borderColor, boxShadow } = gameData
    return (
      <Box
        h="100%"
        backgroundImage={`${backgroundImage}`}
        backgroundSize="cover"
        backgroundPosition="center"
        borderRadius="16px"
        boxShadow={
          isExpired || isPaused ? 'none' : `6px 6px 32px 11px ${boxShadow}`
        }
        border={`4px solid ${isExpired ? '#787878' : borderColor}`}
      >
        <Box
          display="flex"
          flexDirection="column"
          backdropFilter={isExpired ? 'grayscale(100%)' : 'none'}
          w="100%"
          h="100%"
        >
          <Box
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            p={2}
          >
            <Button
              onClick={terminateTimer}
              size="md"
              h="3rem"
              w="3rem"
              borderRadius="50%"
              colorScheme="red"
            >
              <CloseIcon />
            </Button>
          </Box>
          <Center h="100%">
            <VStack minWidth="30%" maxWidth="70%" my="auto">
              <p className="timer-name">{name}</p>
              <h2 className="timer-time">{value}</h2>
              {renderControls()}
            </VStack>
          </Center>
        </Box>
        {isExpired && (
          <audio style={{ display: 'none' }} controls autoPlay>
            <source src={alarm} type="audio/mp3" />
          </audio>
        )}
      </Box>
    )
  }

  const renderChangeTime = () => {
    return (
      <Modal isOpen={isOpen} title="Change Time" onClose={onClose}>
        <TimingPhase
          onClickBack={onClose}
          onClickNext={onChangeTime}
          initialValue={currentOptions}
        />
      </Modal>
    )
  }

  return (
    <>
      {renderTimer(game)}
      {renderChangeTime()}
    </>
  )
}

export default TimerComp
