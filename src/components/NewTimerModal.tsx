import { useDisclosure } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useEffect, useState, } from 'react'
import { NewTimerModalProps, IncomingTimerProps, TimerConfig } from '../types/app-types'
import NamingPhase from './ModalSteps/NamingPhase'
import GamingPhase from './ModalSteps/GamingPhase'
import TimingPhase from './ModalSteps/TimingPhase'
import { GameKey } from './Timer/timerStyles'

enum Phase {
  SetName,
  SetGameType,
  SetCountdown,
  Complete
}

const initialParams = {
  name: '',
  game: '' as GameKey,
  initialTime: { minutes: 0, seconds: 0 },
}

const NewTimerModal: React.FC<NewTimerModalProps> = ({ onModalComplete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [phase, setPhase] = useState<Phase>(Phase.SetName)
  const [newTimerParams, setNewTimerParams] = useState<TimerConfig>(initialParams)


  const resetModal = () => {
    onClose()
    setPhase(Phase.SetName)
    setNewTimerParams(initialParams)
  }

  const onBack = () => {
    if (phase === Phase.SetName) {
      return
    }
    setPhase((prevPhase) => prevPhase - 1)
  }

  const nextPhase = () => {
    const transitions: Partial<Record<Phase, Phase>> = {
      [Phase.SetName]: Phase.SetGameType,
      [Phase.SetGameType]: Phase.SetCountdown,
      [Phase.SetCountdown]: Phase.Complete
    }

    const nextPhase = transitions[phase]
    if (nextPhase) {
      return setPhase(nextPhase)
    }

  }



  useEffect(() => {
    if (phase !== Phase.Complete) {
      return
    }

    const complete = newTimerParams.name && newTimerParams.game && newTimerParams.initialTime
    if (!complete) {
      return
    }

    onModalComplete(newTimerParams)
    resetModal()
  }, [phase])

  const onClickNext = (values: Partial<IncomingTimerProps>) => {
    setNewTimerParams(prev => ({ ...prev, ...values }))
    nextPhase()
  }

  const renderModalByPhase = () => {
    switch (phase) {
      case Phase.SetName:
        return (
          <NamingPhase
            onClickNext={onClickNext}
          />
        )
      case Phase.SetGameType:
        return (
          <GamingPhase
            onClickBack={onBack}
            onClickNext={onClickNext}
          />
        )
      case Phase.SetCountdown:
        return (
          <TimingPhase
            onClickBack={onBack}
            onClickNext={onClickNext}
          />
        )
    }
  }

  return (
    <>
      <Button
        colorScheme="blue"
        pos="absolute"
        bottom="1.5%"
        right="1%"
        h="3rem"
        w="3rem"
        borderRadius="200px"
        onClick={onOpen}
      >
        <AddIcon />
      </Button>

      <Modal
        colorScheme="purple"
        isOpen={isOpen}
        onClose={resetModal}
        isCentered
      >
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="18px" />
        <ModalContent
          bgColor="purple.800"
          boxShadow="2px 2px 20px 10px rgba(0, 0, 0, 0.4)"
          border="1px solid white"
        >
          <ModalHeader color="white">Create your Timer!</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>{renderModalByPhase()}</ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewTimerModal
