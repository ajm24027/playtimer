import './global.css'
import { SimpleGrid, Box } from '@chakra-ui/react'

function App() {
  return (
    <>
      <SimpleGrid columns={3} gap="32px" p={4}>
        <Box bg="tomato" h="96vh"></Box>
        <Box bg="tomato" h="96vh"></Box>
        <Box bg="tomato" h="96vh"></Box>
      </SimpleGrid>
    </>
  )
}

export default App
