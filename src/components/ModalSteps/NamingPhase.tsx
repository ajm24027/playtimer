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

  console.log('This is name currently: ', name)
  return (
    <Container>
      <FormControl>
        <FormLabel>Name Your Timer</FormLabel>
        <Input
          type="Timer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <Button
        type="submit"
        rightIcon={<ArrowForwardIcon />}
        onClick={() => onClickNext(name)}
      >
        Select a Game
      </Button>
    </Container>
  )
}

export default NamingPhase
