import "./global.css";
import NewTimerModal from "./components/NewTimerModal";
import TimerComp from "./components/Timer";
import { Grid } from "@chakra-ui/react";
import { Timer } from "./types/app-types";
import { useState } from "react";

const App = () => {
  const [timers, setTimers] = useState<Timer[]>([]);

  const removeTimerFromState = (timerIndex: number) => {
    const newTimers = timers.filter((timer, index) => index !== timerIndex);
    setTimers(newTimers);
  };

  return (
    <>
      <NewTimerModal
        onModalComplete={(newTimerObj: Timer) => {
          setTimers([...timers, newTimerObj]);
        }}
      />
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={10}
        height="100%"
        mx={10}
        py={8}
        px={4}
      >
        {timers.map((timer, i) => (
          <TimerComp
            key={i}
            name={timer.title}
            initialTime={timer.initialTime}
            game={timer.game}
            terminateTimer={() => removeTimerFromState(i)}
          />
        ))}
      </Grid>
    </>
  );
};

export default App;
