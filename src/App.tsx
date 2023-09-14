import './global.css'
import { useState } from 'react'
import { SimpleGrid, Box, Button } from '@chakra-ui/react'

function App() {
  const [currentBoxCount, setCurrentBoxCount] = useState<number>(1)

  const addBox = (): void => {
    setCurrentBoxCount(currentBoxCount + 1)
  }

  const renderBoxes = (currentBoxCount: number) => {
    return [...Array(currentBoxCount)].map((currentBox: number) => (
      <Box bg="tomato" h="96.5vh">
        <Button colorScheme="blue" onClick={addBox}>
          Add Box
        </Button>
      </Box>
    ))
  }

  return (
    <>
      <SimpleGrid columns={3} gap="40px" p={4}>
        {renderBoxes(currentBoxCount)}
      </SimpleGrid>
    </>
  )
}

export default App
