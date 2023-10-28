import { useEffect, useState, useRef } from "react";
import "../global.css";

const TimerComp = ({ name, initialTime, game }) => {
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00");
  const [isPaused, setIsPaused] = useState(false);
  const [timeAtPause, setTimeAtPause] = useState("");
  const [timerExpired, setTimerExpired] = useState(false);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);

    if (total <= 0) {
      // Total has reached or passed 0, clear the interval
      clearInterval(Ref.current);
      setTimer("X");
      setTimerExpired(true);
    } else if (total < 60000) {
      setTimer(seconds > 9 ? seconds : "0" + seconds);
    } else {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes)
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

  const getDeadTime = (timeString) => {
    let deadline = new Date();
    if (typeof timeString === "number") {
      deadline.setSeconds(deadline.getSeconds() + timeString);
    } else {
      const arrayFromTimeString = timeString.split(":");
      const hours = parseInt(arrayFromTimeString[0]);
      const minutes = parseInt(arrayFromTimeString[1]);
      deadline.setMinutes(deadline.getMinutes() + minutes);
      deadline.setHours(deadline.getHours() + hours);
    }

    return deadline;
  };

  const onClickReset = () => {
    console.log("This is the timer's initial time", initialTime);
    clearTimer(getDeadTime(initialTime));
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

  const renderMoreControls = () => {
    return !isPaused ? (
      <button onClick={onClickPause}>Pause</button>
    ) : (
      <button onClick={onClickResume}>Start</button>
    );
  };

  useEffect(() => {
    clearTimer(getDeadTime(initialTime));
  }, []);

  useEffect(() => {
    if (timerExpired) {
      console.log("timer expired");
    }
  }, [timerExpired]);

  return (
    <div>
      <h2 className="timer-name">{name}</h2>
      <h2 className="timer-time">{timer}</h2>
      <button onClick={onClickReset}>Reset</button>
      {renderMoreControls()}
    </div>
  );
};

export default TimerComp;
