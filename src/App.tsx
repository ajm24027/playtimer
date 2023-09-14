import './global.css'
import { SimpleGrid, Box } from '@chakra-ui/react'

function App() {
  return (
    <>
      <SimpleGrid minChildWidth="300px" spacing="40px" p={4}>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
        <Box bg="tomato" height="80px"></Box>
      </SimpleGrid>
    </>
  )
}

export default App
