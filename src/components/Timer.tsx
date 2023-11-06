import { useEffect, useState, useRef } from "react";
import { Center, Text, VStack, Button } from "@chakra-ui/react";
import "../global.css";

const TimerComp = ({ name, initialTime, game, terminateTimer }) => {
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00");
  const [isPaused, setIsPaused] = useState(false);
  const [timeAtPause, setTimeAtPause] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    // const hours = Math.floor((total / 1000 / 60 / 60) % 24)
    return {
      total,
      // hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    // let { total, hours, minutes, seconds } = getTimeRemaining(e)

    // if (total <= 0) {
    //   clearInterval(Ref.current)
    //   setTimer('X')
    //   setIsExpired(true)
    // } else if (total < 60000) {
    //   setTimer(seconds > 9 ? seconds : '0' + seconds)
    // } else {
    //   setTimer(
    //     (hours > 9 ? hours : '0' + hours) +
    //       ':' +
    //       (minutes > 9 ? minutes : '0' + minutes)
    //   )
    // }

    if (total <= 0) {
      clearInterval(Ref.current);
      setTimer("X");
      setIsExpired(true);
    } else if (total < 60000) {
      setTimer(seconds > 9 ? seconds : "0" + seconds);
    } else {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (deadline) => {
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

  // const getDeadTime = (timeString) => {
  //   let deadline = new Date()
  //   if (typeof timeString === 'number') {
  //     deadline.setSeconds(deadline.getSeconds() + timeString)
  //   } else {
  //     const arrayFromTimeString = timeString.split(':')
  //     const hours = parseInt(arrayFromTimeString[0])
  //     const minutes = parseInt(arrayFromTimeString[1])
  //     deadline.setMinutes(deadline.getMinutes() + minutes)
  //     deadline.setHours(deadline.getHours() + hours)
  //   }

  //   return deadline
  // }

  const getDeadTime = (time: number | string) => {
    let deadline = new Date();
    if (typeof time === "number") {
      deadline.setSeconds(deadline.getSeconds() + time);
    } else {
      const arrayFromTime = time.split(":");
      const minutes = parseInt(arrayFromTime[0]);
      const seconds = parseInt(arrayFromTime[1]);
      deadline.setMinutes(deadline.getMinutes() + minutes);
      deadline.setSeconds(deadline.getSeconds() + seconds);
      // deadline.setHours(deadline.getHours() + hours)
    }

    return deadline;
  };

  const onClickReset = () => {
    clearTimer(getDeadTime(initialTime));
    setIsExpired(false);
  };

  const onClickPause = () => {
    setTimeAtPause(timer);
    clearInterval(Ref.current);
    setIsPaused(!isPaused);
  };

  const onClickResume = () => {
    clearTimer(getDeadTime(timeAtPause));
    setIsPaused(!isPaused);
  };

  const renderControls = () => {
    return isExpired === true ? (
      <button onClick={onClickReset}>Reset</button>
    ) : !isPaused ? (
      <>
        <button onClick={onClickReset}>Reset</button>
        <button onClick={onClickPause}>Pause</button>
      </>
    ) : (
      <>
        <button onClick={onClickReset}>Reset</button>
        <button onClick={onClickResume}>Start</button>
      </>
    );
  };

  const renderTimer = (game: string) => {
    return isExpired === true ? null : (
      <Center bg="tomato" h="100%" rounded="md">
        <VStack width="55%">
          <Text fontSize="2xl">{name}</Text>
          <h2 className="timer-time">{timer}</h2>
          {renderControls()}
          <Button onClick={terminateTimer} />
        </VStack>
      </Center>
    );
  };

  useEffect(() => {
    clearTimer(getDeadTime(initialTime));
  }, []);

  return <>{renderTimer()}</>;
};

export default TimerComp;
