import React from 'react'

import Logo from './Logo'
import Header from './Header'
import Footer from './Footer'

import { RiDiscordLine } from "react-icons/ri";
//import { BiLinkExternal } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";
import fetchPoint from './../panel/Features/fetchPoint'

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

const line_box = "solid #323136 1px"
const gridI = {
  paddingTop: "6px",
  paddingBottom: "6px",
  marginTop: "6px"
}
const Index = () => {

  return ( <>

    <Box
      display="flex"
      flexDir="column"
      minH="calc(100vh - 93px)"
    >
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
            <Button 
              colorScheme="purple" 
              variant="solid" 
              marginTop="25px"
              onClick={() => {window.location.href = 'https://discord.com/oauth2/authorize?client_id=657839781509857302&scope=bot&permissions=8'}}>
                <RiDiscordLine/> <p>Invítame!</p>
              </Button>
          </center>
        </Box>

        <Box style={gridI} border={line_box} rounded="md">
          <Stats/>
        </Box>

      </SimpleGrid>
    </Box>
    <Footer/>
  </>)

}

const stupidFacts = () => {
  const facts = [
    "Los búhos son las únicas aves que pueden ver el color azul",
    "La orina del gato brilla bajo la luz negra",
    "Una vaca puede subir escaleras, pero no bajarlas",
    "Los cuacs de los patos no producen eco",
    "El diablo anda suelto, anda pisando el pavimento",
    "Las jurafas duermen mas que tu (Y eso que duermen 2 horas al día!)",
    "Los delfines tienen menos confianza que tu ex tóxica por lo que duermen con un ojo abierto",
    "Agua",
    "La mayoría de las naranjas son verdes",
    "La pizza con piña será ilegal en 2077"
  ]
  return facts[Math.floor(Math.random() * facts.length)]
}

const Stats = () => {
  const data = fetchPoint(0, '/api/bot')
  return (
  <center>
    <Heading as="h5" size="sm">Stats</Heading>
    <Stack paddingX="30px" paddingTop="5px">

      <Skeleton height="20px" isLoaded={data !== "loading"}>
        <b>Servidores activos: </b>{data.guilds}
      </Skeleton>

      <Skeleton height="20px" isLoaded={data !== "loading"}>
        <b>Usuarios activos: </b>{data.users}
      </Skeleton>

      <Skeleton height="20px"  isLoaded={data !== "loading"}>
        {stupidFacts()}
      </Skeleton>

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