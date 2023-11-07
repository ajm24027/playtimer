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
  FormLabel
} from '@chakra-ui/react'
import { useState } from 'react'

const TimingPhase = ({ onClickNext }) => {
  const [countdown, SetCountDown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })

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
        </VStack> */}
          <VStack>
            <NumberInput
              color="white"
              focusBorderColor="green.500"
              defaultValue={30}
              value={countdown.minutes}
              onChange={(e) =>
                SetCountDown({ ...countdown, minutes: parseInt(e, 10) })
              }
              min={1}
              max={59}
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
              onChange={(e) =>
                SetCountDown({ ...countdown, seconds: parseInt(e, 10) })
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
    )
  }

  return (
    <>
      {renderNumInputs()}
      <HStack mt={4} justify="space-between">
        <Button>Back</Button>
        <Button
          isDisabled={
            countdown.minutes === 0 && countdown.seconds === 0 ? true : false
          }
          colorScheme="green"
          type="submit"
          onClick={() => {
            const formattedCountdown = () => {
              const { minutes, seconds } = countdown
              return (
                // (hours > 9 ? hours : "0" + hours) +
                // ":" +
                (minutes > 9 ? minutes : '0' + minutes) +
                ':' +
                (seconds > 9 ? seconds : '0' + seconds)
              )
            }
            // console.log(formattedCountdown())
            onClickNext(formattedCountdown())
          }}
        >
          Create Timer
        </Button>
      </HStack>
    </>
  )
}

export default TimingPhase
