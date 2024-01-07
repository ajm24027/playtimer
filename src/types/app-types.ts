import { GameKey } from "../components/Timer/timerStyles";
import { UseTimerOptions } from "../components/Timer/useTimer";

export interface TimerConfig {
  name: string;
  initialTime: UseTimerOptions;
  game: GameKey;
}

export interface IncomingTimerProps extends TimerConfig {
  terminateTimer: () => void;
}

export interface PhaseNavProps {
  onClickNext: (values: Partial<TimerConfig>) => void
  onClickBack?: () => void
}

export interface NewTimerModalProps {
  onModalComplete: (config: TimerConfig) => void;
}

