import {
  Container,
  FormControl,
  FormLabel,
  Button,
  Select,
  HStack
} from '@chakra-ui/react'
import { PhaseNavProps } from '../../types/app-types'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { GameKey } from '../Timer/timerStyles'

const GamingPhase: React.FC<PhaseNavProps> = ({ onClickNext, onClickBack }) => {
  const [game, setGame] = useState('')
  return (
    <Container>
      <FormControl isRequired={true}>
        <FormLabel color="white">Choose a game from the list</FormLabel>
        <Select
          color="white"
          focusBorderColor="green.500"
          onChange={(e) => setGame(e.target.value)}
          placeholder="Choose a game here"
          value={game}
        >
          <option value="lorcana">Lorcana</option>
          <option value="onepiece">One Piece</option>
          <option value="mtg">Magic The Gathering</option>
          <option value="bss">Battle Spirits Saga</option>
          <option value="fab">Flesh and Blood</option>
          <option value="pokemon">Pokémon</option>
          <option value="digimon">Digimon</option>
          <option value="shadowverse">Shadowverse</option>
          <option value="dragonball">Dragon Ball Super</option>
        </Select>
      </FormControl>
      <HStack mt={4} justify="space-between">
        <Button onClick={onClickBack}>back</Button>

        <Button
          colorScheme="green"
          type="submit"
          rightIcon={<ArrowForwardIcon />}
          isDisabled={game === ''}
          onClick={() => onClickNext({ game: game as GameKey })}
        >
          Set Timer Length
        </Button>
      </HStack>
    </Container>
  )
}
export default GamingPhase
