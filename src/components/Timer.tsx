import { useEffect, useState, useRef } from "react";
import { Center, VStack, HStack, Button, Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { IncomingTimerProps } from "../types/app-types";
import "../global.css";

interface TimerProps extends IncomingTimerProps {
  game: string;
  terminateTimer: () => void;
}

const TimerComp = ({ name, initialTime, game, terminateTimer }: TimerProps) => {
  const Ref = useRef<number | null>(null);
  const [timer, setTimer] = useState<string>("00:00");
  const [isPaused, setIsPaused] = useState(false);
  const [timeAtPause, setTimeAtPause] = useState<string>("");
  const [isExpired, setIsExpired] = useState(false);

  const gamesBackgroundsAndBorderObj = {
    lorcana: {
      backgroundImage:
        "url('https://d2v9ou34ah9m2h.cloudfront.net/Lorcana.png')",
      borderColor: "#ff9900",
      boxShadow: "rgba(255,153,0,0.63)",
    },
    mtg: {
      backgroundImage: "url('https://d2v9ou34ah9m2h.cloudfront.net/mtg.png')",
      borderColor: "#FF6666",
      boxShadow: "rgba(255,102,102,0.63)",
    },
    bss: {
      backgroundImage: "url('https://d2v9ou34ah9m2h.cloudfront.net/bss.png')",
      borderColor: "#00FFBF",
      boxShadow: "rgba(0,255,191,0.63)",
    },
    fab: {
      backgroundImage: "url('https://d2v9ou34ah9m2h.cloudfront.net/fab.png')",
      borderColor: "#FFFF00",
      boxShadow: "rgba(255,255,0,0.63)",
    },
    pokemon: {
      backgroundImage:
        "url('https://d2v9ou34ah9m2h.cloudfront.net/pokemon.png')",
      borderColor: "#00CCFF",
      boxShadow: "rgba(0,204,255,0.63)",
    },
    digimon: {
      backgroundImage:
        "url('https://d2v9ou34ah9m2h.cloudfront.net/digimon.png')",
      borderColor: "#0099CD",
      boxShadow: "rgba(0,153,205,0.63)",
    },
    shadowverse: {
      backgroundImage:
        "url('https://d2v9ou34ah9m2h.cloudfront.net/Shadowverse.png')",
      borderColor: "#2A52BE",
      boxShadow: "rgba(42,82,190,0.63)",
    },
    dragonball: {
      backgroundImage:
        "url('https://d2v9ou34ah9m2h.cloudfront.net/dragonball.png')",
      borderColor: "#00ED00",
      boxShadow: "rgba(0,237,0,0.63)",
    },
    onepiece: {
      backgroundImage:
        "url('https://d2v9ou34ah9m2h.cloudfront.net/onepiece.png')",
      borderColor: "#FF0000",
      boxShadow: "rgba(255,0,0,0.63)",
    },
  };

  const getTimeRemaining = (e: Date) => {
    const total = Date.parse(e.toString()) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: Date) => {
    const { total, minutes, seconds } = getTimeRemaining(e);

    if (total <= 0) {
      if (Ref.current) clearInterval(Ref.current);
      setTimer("00");
      setIsExpired(true);
    } else if (total < 60000) {
      setTimer(seconds > 9 ? seconds.toString() : "0" + seconds);
    } else {
      setTimer(
        (minutes > 9 ? minutes.toString() : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds.toString() : "0" + seconds)
      );
    }
  };

  const clearTimer = (deadline: Date) => {
    if (!timeAtPause) {
      setTimer(initialTime);
    } else {
      setTimer(timeAtPause);
    }

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(deadline);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = (time: number | string) => {
    const deadline = new Date();

    if (typeof time === "number") {
      deadline.setSeconds(deadline.getSeconds() + time);
    } else {
      const arrayFromTime = time.split(":");
      const minutes = parseInt(arrayFromTime[0]);
      const seconds = parseInt(arrayFromTime[1]);
      deadline.setMinutes(deadline.getMinutes() + minutes);
      deadline.setSeconds(deadline.getSeconds() + seconds);
    }

    return deadline;
  };

  const onClickReset = () => {
    clearTimer(getDeadTime(initialTime));
    setIsExpired(false);
  };

  const onClickPause = () => {
    setTimeAtPause(timer);
    if (Ref.current) clearInterval(Ref.current);
    setIsPaused(!isPaused);
  };

  const onClickResume = () => {
    clearTimer(getDeadTime(timeAtPause));
    setIsPaused(!isPaused);
  };

  const renderControls = () => {
    return isExpired ? (
      <Button colorScheme="orange" w="100%" onClick={onClickReset}>
        Reset
      </Button>
    ) : !isPaused ? (
      <>
        <HStack spacing={8} w="100%">
          <Button colorScheme="orange" w="100%" onClick={onClickReset}>
            Reset
          </Button>
          <Button w="100%" colorScheme="yellow" onClick={onClickPause}>
            Pause
          </Button>
        </HStack>
      </>
    ) : (
      <>
        <HStack spacing={8} w="100%">
          <Button colorScheme="orange" w="100%" onClick={onClickReset}>
            Reset
          </Button>
          <Button colorScheme="green" w="100%" onClick={onClickResume}>
            Start
          </Button>
        </HStack>
      </>
    );
  };

  const renderTimer = (game: keyof typeof gamesBackgroundsAndBorderObj) => {
    const gameData = gamesBackgroundsAndBorderObj[game];
    const { backgroundImage, borderColor, boxShadow } = gameData;
    return (
      <Box
        h="100%"
        backgroundImage={`${backgroundImage}`}
        backgroundSize="cover"
        backgroundPosition="center"
        borderRadius="16px"
        boxShadow={isExpired ? "none" : `6px 6px 32px 11px ${boxShadow}`}
        border={isExpired ? "4px solid #787878" : `4px solid ${borderColor}`}
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
            <VStack width="80%" my="auto">
              <p className="timer-name">{name}</p>
              <h2 className="timer-time">{timer}</h2>
              {renderControls()}
            </VStack>
          </Center>
        </Box>
      </Box>
    );
  };

  useEffect(() => {
    clearTimer(getDeadTime(initialTime));
  }, []);
  // @ts-ignore
  return <>{renderTimer(game)}</>;
};

export default TimerComp;
