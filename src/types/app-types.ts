export interface Timer {
  title: string;
  game: string;
  initialTime: string;
}

export interface IncomingTimerProps {
  name: string;
  initialTime: string;
  game: string;
  terminateTimer: () => void;
}
