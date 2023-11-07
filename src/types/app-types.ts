export interface Timer {
  title: string;
  game: string;
  initialTime: string;
  timeAtPause: string
}

export interface IncomingTimerProps {
  name: string;
  initialTime: string;
  game: string;
  terminateTimer: () => void;
}

export interface PhaseNavProps {
  onClickNext: (game: string) => void
  onClickBack?: () => void
}

export interface NewTimerModalProps {
  onModalComplete: (timerParams: Timer) => void;
}

export interface GamesBackgroundsAndBorder {
  [key: string]: {
    backgroundImage: string
    borderColor: string
    boxShadow: string
  }
}