
import { Center, VStack, HStack, Button, Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { IncomingTimerProps } from "../../types/app-types";
import "../../global.css";
import { GameKey, timerStyles } from "./timerStyles";
import { useTimer } from "./useTimer";

const TimerComp = ({ name, initialTime, game, terminateTimer }: IncomingTimerProps) => {
  const { value, isExpired, isPaused, onPause, onReset, onResume } = useTimer(initialTime)

  const renderControls = () => {
    const resetButton = (<Button colorScheme="orange" w="100%" onClick={onReset}>Reset</Button>)

    if (isExpired) {
      return resetButton
    }
    return (<HStack spacing={8} w="100%">
      {resetButton}
      {!isPaused
        ? <Button w="100%" colorScheme="yellow" onClick={onPause}>Pause</Button>
        : <Button colorScheme="green" w="100%" onClick={onResume}>Start</Button>}
    </HStack>)
  };

  const renderTimer = (game: GameKey) => {
    const gameData = timerStyles[game];
    const { backgroundImage, borderColor, boxShadow } = gameData;
    return (
      <Box
        h="100%"
        backgroundImage={`${backgroundImage}`}
        backgroundSize="cover"
        backgroundPosition="center"
        borderRadius="16px"
        boxShadow={
          isExpired || isPaused ? "none" : `6px 6px 32px 11px ${boxShadow}`
        }
        border={`4px solid ${isExpired ? '#787878' : borderColor}`}
      >
        <Box
          display="flex"
          flexDirection="column"
          backdropFilter={isExpired ? "grayscale(100%)" : "none"}
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
      </Box>
    );
  };

  return <>{renderTimer(game)}</>;
};

export default TimerComp;
