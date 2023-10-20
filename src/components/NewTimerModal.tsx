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

enum Phase {
  Naming,
  Gaming,
  Timing
}

const NewTimerModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [phase, setPhase] = useState<Phase>(Phase.Gaming)
  const [newTimerParams, setNewTimerParams] = useState<Timer>({
    title: '',
    game: '',
    initialTime: '',
    timeAtPause: ''
  })

  const renderModalByPhase = () => {
    switch (phase) {
      case Phase.Naming:
        return (
          <NamingPhase
            onClickNext={(title: string) => {
              setNewTimerParams({ ...newTimerParams, title })
              console.log('newTimerParams.title:', newTimerParams.title)
              setPhase(Phase.Gaming)
            }}
          />
        )
      case Phase.Gaming:
        return (
          <GamingPhase
            onClickNext={(game: string) => {
              setNewTimerParams({ ...newTimerParams, game })
              console.log('newTimerParams.game:', newTimerParams.game)
              setPhase(Phase.Timing)
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
