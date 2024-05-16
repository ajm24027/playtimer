import {
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  Button,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { PhaseNavProps } from "../../types/app-types";
import { useState } from "react";
import { UseTimerOptions } from "../Timer/useTimer";

const TimingPhase: React.FC<
  PhaseNavProps & { initialValue?: UseTimerOptions }
> = ({ onClickNext, onClickBack, initialValue }) => {
  const [countdown, setCountdown] = useState<UseTimerOptions>(
    initialValue ?? { minutes: 0, seconds: 0 }
  );

  const renderNumInputs = () => {
    return (
      <FormControl isRequired={true}>
        <FormLabel color="white">How long is the event?</FormLabel>
        <HStack>
          {/* <VStack>
          <NumberInput
            defaultValue={0}
            value={countdown.hours}
            onChange={(e) =>
              setCountdown({ ...countdown, hours: parseInt(e, 10) })
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
        </VStack> */}
          <VStack>
            <NumberInput
              color="white"
              focusBorderColor="green.500"
              defaultValue={30}
              value={countdown.minutes}
              onChange={(value) =>
                setCountdown({ ...countdown, minutes: +value })
              }
              min={1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper color="white" />
                <NumberDecrementStepper color="white" />
              </NumberInputStepper>
            </NumberInput>
            <Text as="b" fontSize="sm" color="gray.300">
              Minutes
            </Text>
          </VStack>
          <VStack>
            <NumberInput
              color="white"
              focusBorderColor="green.500"
              defaultValue={0}
              value={countdown.seconds}
              onChange={(value) =>
                setCountdown({ ...countdown, seconds: +value })
              }
              min={0}
              max={59}
              step={15}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper color="white" />
                <NumberDecrementStepper color="white" />
              </NumberInputStepper>
            </NumberInput>
            <Text as="b" fontSize="sm" color="gray.300">
              Seconds
            </Text>
          </VStack>
        </HStack>
      </FormControl>
    );
  };

  return (
    <>
      {renderNumInputs()}
      <HStack mt={4} justify="space-between">
        <Button onClick={onClickBack}>Back</Button>
        <Button
          isDisabled={
            countdown.minutes === 0 && countdown.seconds === 0 ? true : false
          }
          colorScheme="green"
          type="submit"
          onClick={() => {
            const { minutes, seconds } = countdown;
            onClickNext({ initialTime: { minutes, seconds } });
          }}
        >
          Save Timer
        </Button>
      </HStack>
    </>
  );
};

export default TimingPhase;
