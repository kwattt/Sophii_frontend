import React from 'react'

import Logo from './Logo'
import Header from './Header'

import { 
  Box,
  Center,
  Heading,
} from '@chakra-ui/react'

let line = " "

const Index = () => {

  return ( <>

    <Header/>

    <Box border={line}> 
      <Center>
        <Logo/>
      </Center>
      <center>
        <Heading as="h2" size="xl">Sophii 🤍</Heading>
        <Heading as="h4" size="md" fontFamily="sans-serif">---</Heading>
      </center>
    </Box>

    {/* <SimpleGrid columns={[1, 3]} paddingX="40px" spacingX="90px">
      <Box border={line}>ASD</Box>
      <Box border={line}>
        asd
      </Box>
      <Box border={line}>ASD</Box>
    </SimpleGrid> */}
    </>
  )

}



export default Index

