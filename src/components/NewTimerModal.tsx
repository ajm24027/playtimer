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
import { useState } from 'react'
import { Timer } from '../types/app-types'
import NamingPhase from './ModalSteps/NamingPhase'
import GamingPhase from './ModalSteps/GamingPhase'
import TimingPhase from './ModalSteps/TimingPhase'

enum Phase {
  SetName,
  SetGameType,
  SetCountdown
}

const NewTimerModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [phase, setPhase] = useState<Phase>(Phase.SetName)
  const [newTimerParams, setNewTimerParams] = useState<Timer>({
    title: '',
    game: '',
    initialTime: '',
    timeAtPause: ''
  })

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

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalHeader>{phase}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{renderModalByPhase()}</ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewTimerModal
