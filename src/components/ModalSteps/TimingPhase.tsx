import {
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

const TimingPhase = ({ onClickNext }) => {
  const [countdown, SetCountDown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const renderNumInputs = () => {
    return (
      <HStack>
        <VStack>
          <NumberInput
            defaultValue={0}
            value={countdown.hours}
            onChange={(e) =>
              SetCountDown({ ...countdown, hours: parseInt(e, 10) })
            }
            min={0}
            max={23}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <p>Hours</p>
        </VStack>
        <VStack>
          <NumberInput
            defaultValue={1}
            value={countdown.minutes}
            onChange={(e) =>
              SetCountDown({ ...countdown, minutes: parseInt(e, 10) })
            }
            min={1}
            max={59}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <p>Minutes</p>
        </VStack>
        {/* <VStack>
          <NumberInput
            defaultValue={0}
            value={countdown.seconds}
            onChange={(e) =>
              SetCountDown({ ...countdown, seconds: parseInt(e, 10) })
            }
            min={0}
            max={59}
            step={15}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <p>Seconds</p>
        </VStack> */}
      </HStack>
    );
  };

  return (
    <>
      {renderNumInputs()}
      <Button
        type="submit"
        onClick={() => {
          const formattedCountdown = () => {
            const { hours, minutes, seconds } = countdown;
            return (
              // (hours > 9 ? hours : "0" + hours) +
              // ":" +
              // (minutes > 9 ? minutes : "0" + minutes) +
              // ":" +
              // (seconds > 9 ? seconds : "0" + seconds)
              (hours > 9 ? hours : "0" + hours) +
              ":" +
              (minutes > 9 ? minutes : "0" + minutes)
            );
          };
          // console.log(formattedCountdown())
          onClickNext(formattedCountdown());
        }}
      >
        Create Timer
      </Button>
    </>
  );
};

export default TimingPhase;
