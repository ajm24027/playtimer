import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { Timer } from "../types/app-types";
import NamingPhase from "./ModalSteps/NamingPhase";
import GamingPhase from "./ModalSteps/GamingPhase";
import TimingPhase from "./ModalSteps/TimingPhase";

enum Phase {
  SetName,
  SetGameType,
  SetCountdown,
}

const NewTimerModal = ({ onModalComplete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [phase, setPhase] = useState<Phase>(Phase.SetName);
  const [newTimerParams, setNewTimerParams] = useState<Timer>({
    title: "",
    game: "",
    initialTime: "",
    timeAtPause: "",
  });

  const initialTimerParams = {
    title: "",
    game: "",
    initialTime: "",
    timeAtPause: "",
  };

  const renderModalByPhase = () => {
    switch (phase) {
      case Phase.SetName:
        return (
          <NamingPhase
            onClickNext={(title: string) => {
              setNewTimerParams({ ...newTimerParams, title });
              setPhase(Phase.SetGameType);
            }}
          />
        );
      case Phase.SetGameType:
        return (
          <GamingPhase
            onClickNext={(game: string) => {
              setNewTimerParams({ ...newTimerParams, game });
              setPhase(Phase.SetCountdown);
            }}
          />
        );
      case Phase.SetCountdown:
        return (
          <TimingPhase
            onClickNext={(initialTime: string) => {
              setNewTimerParams({ ...newTimerParams, initialTime });
              setPhase(Phase.SetName);
              onClose();
            }}
          />
        );
    }
  };

  const resetModal = () => {
    onClose();
    setPhase(Phase.SetName);
    setNewTimerParams(initialTimerParams);
  };

  useEffect(() => {
    if (
      newTimerParams.title &&
      newTimerParams.game &&
      newTimerParams.initialTime
    ) {
      onModalComplete(newTimerParams);
      setNewTimerParams(initialTimerParams);
    }
  }, [newTimerParams]);

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

      <Modal isOpen={isOpen} onClose={resetModal}>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalHeader>{phase}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{renderModalByPhase()}</ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewTimerModal;
