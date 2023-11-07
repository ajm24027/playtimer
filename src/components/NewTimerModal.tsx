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
import { useState, useEffect } from 'react'
import { Timer, NewTimerModalProps } from '../types/app-types'
import NamingPhase from './ModalSteps/NamingPhase'
import GamingPhase from './ModalSteps/GamingPhase'
import TimingPhase from './ModalSteps/TimingPhase'

enum Phase {
  SetName,
  SetGameType,
  SetCountdown
}

const NewTimerModal: React.FC<NewTimerModalProps> = ({ onModalComplete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [phase, setPhase] = useState<Phase>(Phase.SetName)
  const [newTimerParams, setNewTimerParams] = useState<Timer>({
    title: '',
    game: '',
    initialTime: '',
    timeAtPause: ''
  })

  const initialTimerParams = {
    title: '',
    game: '',
    initialTime: '',
    timeAtPause: ''
  }

  const goBackOnePhase = () => {
    if (phase > 0) {
      console.log('goBackOnePhase firing')
      setPhase((prevPhase) => prevPhase - 1)
    } else {
      return null
    }
  }

  const renderModalByPhase = () => {
    switch (phase) {
      case Phase.SetName:
        return (
          <NamingPhase
            onClickNext={(title: string) => {
              setNewTimerParams({ ...newTimerParams, title })
              setPhase(Phase.SetGameType)
            }}
          />
        )
      case Phase.SetGameType:
        return (
          <GamingPhase
            onClickBack={goBackOnePhase}
            onClickNext={(game: string) => {
              setNewTimerParams({ ...newTimerParams, game })
              setPhase(Phase.SetCountdown)
            }}
          />
        )
      case Phase.SetCountdown:
        return (
          <TimingPhase
            onClickNext={(initialTime: string) => {
              setNewTimerParams({ ...newTimerParams, initialTime })
              setPhase(Phase.SetName)
              onClose()
            }}
          />
        )
    }
  }

  const resetModal = () => {
    onClose()
    setPhase(Phase.SetName)
    setNewTimerParams(initialTimerParams)
  }

  useEffect(() => {
    if (
      newTimerParams.title &&
      newTimerParams.game &&
      newTimerParams.initialTime
    ) {
      onModalComplete(newTimerParams)
      setNewTimerParams(initialTimerParams)
    }
  }, [newTimerParams])

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
        <ModalContent bgColor="purple.800">
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
