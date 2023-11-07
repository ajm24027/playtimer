import {
  Container,
  FormControl,
  FormLabel,
  Button,
  Input
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useState } from 'react'

const NamingPhase = ({ onClickNext }) => {
  const [name, setName] = useState('')

  // console.log('This is name currently: ', name)
  return (
    <Container>
      <FormControl isRequired={true}>
        <FormLabel color="white">What is the name of your event?</FormLabel>
        <Input
          color="white"
          focusBorderColor="green.500"
          type="Timer Name"
          value={name}
          placeholder="MTG Commander League"
          isRequired={true}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme="green"
        type="submit"
        rightIcon={<ArrowForwardIcon />}
        onClick={() => onClickNext(name)}
        mt={4}
        isDisabled={name === '' ? true : false}
      >
        Select a Game
      </Button>
    </Container>
  )
}

export default NamingPhase
