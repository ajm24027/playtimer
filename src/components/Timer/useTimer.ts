import moment from "moment";
import { Duration } from "moment";
import { useEffect, useRef, useState } from "react";

export type UseTimerOptions = { minutes: number; seconds: number };
export const useTimer = ({ minutes, seconds }: UseTimerOptions) => {
  const [timer, setTimer] = useState<Duration>(
    moment.duration({ minutes, seconds })
  );
  const [isActive, setActive] = useState(false);
  const interval = useRef<number>();

  useEffect(() => {
    const tick = () => {
      setTimer((p) => p.clone().subtract(1, "second"));
    };
    if (isActive) {
      interval.current = setInterval(tick, 1000);
    } else {
      clearInterval(interval.current);
    }
  }, [isActive]);

  useEffect(() => {
    if (timer.asSeconds() === 0) {
      setActive(false);
    }
  }, [timer]);

  const onReset = () => {
    setTimer(moment.duration({ minutes, seconds }));
  };
  const onPause = () => {
    setActive(false);
  };

  const onResume = () => {
    setActive(true);
  };

  const changeTime = (options: UseTimerOptions) => {
    setTimer(moment.duration(options));
  };

  const getFormat = () => {
    const seconds = timer.asSeconds();
    const hour = timer.hours();
    if (hour > 0) {
      return "HH:mm:ss";
    }
    if (seconds >= 60) {
      return "mm:ss";
    }
    return "s";
  };

  return {
    currentOptions: {
      minutes: timer.minutes(),
      seconds: timer.seconds(),
    },
    isActive,
    isPaused: !isActive,
    isExpired: timer.asSeconds() === 0,
    onReset,
    onResume,
    onPause,
    changeTime,
    value: moment.utc(timer.asMilliseconds()).format(getFormat()),
  };
};
