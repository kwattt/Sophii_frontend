import React from 'react'

import Logo from './Logo'
import Header from './Header'

import { RiDiscordLine } from "react-icons/ri";
//import { BiLinkExternal } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";

import { 
  Box,
  Center,
  SimpleGrid,
  Heading,
  Stack,
  Skeleton,
//  Link,
  List,
  ListIcon,
  ListItem,
  Button
} from '@chakra-ui/react'

//const line = "solid white 3px"
const line_box = "solid #323136 1px"
const gridI = {
  paddingTop: "6px",
  paddingBottom: "6px",
  marginTop: "6px"
}
const Index = () => {

  return ( <>

    <Header/>
    <Box> 
      <Center>
        <Logo/>
      </Center>
      <center>
        <Heading as="h2" size="xl">Sophii 💗</Heading>
        <Heading as="h4" size="md" fontFamily="sans-serif">---</Heading>
      </center>
    </Box>
    <br/>

    <SimpleGrid minChildWidth="160px" paddingX="100px" spacingX="90px">
      <Box style={gridI} border={line_box} rounded="md">
          <Funciones/>
      </Box>

      <Box style={gridI} rounded="md">
        <center>
          <Button colorScheme="purple" variant="solid" marginTop="25px"> <RiDiscordLine/> <p>Invítame!</p></Button>
        </center>
      </Box>

      <Box style={gridI} border={line_box} rounded="md">
        <Stats/>
      </Box>
    </SimpleGrid>
    </>
  )

}

const Stats = () => {
return (
  <center>
    <Heading as="h5" size="sm">Stats</Heading>
    <Stack paddingX="30px" paddingTop="5px">

      {/* <b>Servidores activos</b> fetchData blablah */ }
      <Skeleton height="20px" />

      {/* <b>Miembros totales</b> fetchData blablah */ }
      <Skeleton height="20px" />

      {/* <b>Otra cosa interesante :)</b> fetchData blablah */ }
      <Skeleton height="20px" />

    </Stack>
  </center>
  )
}

const Funciones = () => {

return (
  <center>
    <Heading as="h5" size="sm">Funciones</Heading>

    <List marginTop="10px" spacing={2}>
      <ListItem>
        <ListIcon as={BsFillGearFill} color="purple.500" />
        Configurable por web.
      </ListItem>
      <ListItem>
        <ListIcon as={BsCheck} color="purple.500" />
        Mensajes de información
      </ListItem>
      <ListItem>
        <ListIcon as={BsCheck} color="purple.500" />
        Informe de redes sociales (twitch!)
      </ListItem>
      <ListItem>
        <ListIcon as={BsCheck} color="purple.500" />
        Entretenimiento
      </ListItem>
    </List>
    <br/>
  </center>
  )
}

//     <Link paddingLeft="1rem">Más!{" "}<BiLinkExternal style={{display: "inline-block"}}/> </Link>

export default Index