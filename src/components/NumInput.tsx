import '../global.css'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react'

const NumInput = (props) => {
  console.log(props)
  const renderNumInput = () => {
    switch (props.interval) {
      case 'hours':
        return (
          <>
            <NumberInput defaultValue={0} min={0} max={23}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <p>Hours</p>
          </>
        )
      case 'minutes':
        return (
          <>
            <NumberInput defaultValue={1} min={1} max={59}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <p>Minutes</p>
          </>
        )
      case 'seconds':
        return (
          <>
            <NumberInput defaultValue={0} min={0} max={59} step={15}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <p>Seconds</p>
          </>
        )
      default:
        null
    }
  }

  return <>{renderNumInput()}</>
}

export default NumInput
