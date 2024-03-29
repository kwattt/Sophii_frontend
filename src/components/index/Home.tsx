import React from 'react'

import Logo from './Logo'
import Header from './Header'
import Footer from './Footer'

import { RiDiscordLine } from "react-icons/ri";
import { BsFillGearFill } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";
import fetchPoint from './../panel/Features/fetchPoint'

import { 
  Box,
  Text,
  Center,
  SimpleGrid,
  Heading,
  Stack,
  Skeleton,
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
        <Box textAlign="center">
          <Heading as="h2" size="xl">Sophii 💗</Heading>
        </Box>
      </Box>
      <br/>

      <SimpleGrid minChildWidth="160px" paddingX="100px" spacingX="90px">

        <Box style={gridI} border={line_box} rounded="md">
            <Funciones/>
        </Box>

        <Box style={gridI} rounded="md">
          <Center>
            <Button 
              colorScheme="purple" 
              variant="solid" 
              marginTop="25px"
              onClick={() => {window.location.href = 'https://discord.com/oauth2/authorize?client_id=657839781509857302&scope=bot&permissions=8'}}>
                <RiDiscordLine/> <p>Invítame!</p>
              </Button>
          </Center>
        </Box>

        <Box style={gridI} border={line_box} rounded="md">
          <Stats/>
        </Box>

      </SimpleGrid>
    </Box>
    <Footer/>
  </>)

}

const Stats = () => {
  const data = fetchPoint("0", '/api/bot')
  return (
  <Box textAlign="center" minH="160px">
    <Heading as="h5" size="sm">Stats</Heading>
    <Stack spacing={10}>

      <Skeleton height="20px" isLoaded={data !== "loading"}>
        <b>Servidores activos: </b>{data.guilds}
      </Skeleton>

      <Skeleton height="20px" isLoaded={data !== "loading"}>
        <b>Usuarios activos: </b>{data.users}
      </Skeleton>

      <Skeleton display={{base: "none", sm: "block"}} height="20px"  isLoaded={data !== "loading"}>
        <Text>{data.msg}</Text>
      </Skeleton>

    </Stack>
  </Box>
  )
}

const Funciones = () => {

return (
  <Box textAlign="center">
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
  </Box>
  )
}

//     <Link paddingLeft="1rem">Más!{" "}<BiLinkExternal style={{display: "inline-block"}}/> </Link>

export default Index