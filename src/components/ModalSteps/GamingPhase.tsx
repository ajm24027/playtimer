import {
  Container,
  FormControl,
  FormLabel,
  Button,
  Select
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useState } from 'react'

const GamingPhase = ({ onClickNext }) => {
  const [game, setGame] = useState('')
  return (
    <Container>
      <FormControl>
        <FormLabel>Choose a game from the list</FormLabel>
        <Select
          onChange={(e) => setGame(e.target.value)}
          placeholder="Choose a game here"
          value={game}
        >
          <option value="lorcana">Lorcana</option>
          <option value="mtg">Magic The Gathering</option>
          <option value="bss">Battle Spirits Saga</option>
          <option value="fab">Flesh and Blood</option>
          <option value="pokemon">Pokémon</option>
          <option value="digimon">Digimon</option>
          <option value="shadowverse">Shadowverse</option>
        </Select>
      </FormControl>
      <Button
        type="submit"
        rightIcon={<ArrowForwardIcon />}
        onClick={() => onClickNext(game)}
      >
        Set Timer Length
      </Button>
    </Container>
  )
}
export default GamingPhase
