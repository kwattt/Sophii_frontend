
import {useState} from 'react'
import logo from '../../logo.webp'
import { Link as ReachLink } from "react-router-dom"

import {BiLogOut,BiMenu} from 'react-icons/bi'

import Account from './Account/Account'

import {
  Image,
  Box,
  IconButton,
  Flex,
  Text,
  Button,
  Heading,
  useColorModeValue
} from "@chakra-ui/react";

const Header = () => {
  const [menu, setMenu] = useState(false)
  const bg = useColorModeValue("gray.400", "gray.900")

  return (
    <div>
    <header>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="10px"
        bg={bg}
        color="white"
      >

      <Flex align="center" mr={5}>
        <Image 
              width="37px"
              height="37px"
              boxSize="37px"
              objectFit="cover"
        src={logo} alt="Sophii Logo" />

        <Heading as="h3" size="md">
          <Text as={ReachLink} to="/">{"Sophii <3"}</Text>
        </Heading>
      </Flex>

        <IconButton display={{sm: "none", base: "flex"}}
          variant="outline"
          colorScheme="yellow"
          aria-label="Menú"
          fontSize="20px"
          icon={<BiMenu />}
          onClick={() => {setMenu(!menu)}}
        />

        <Box paddingRight="10px" display={
          !menu &&  {base: "none", sm: "flex"}
        }>

          <Flex>

            <Account/>

            <Button 
              borderRadius={0} 
              size="sm" 
              leftIcon={<BiLogOut />} 
              colorScheme="pink" 
              variant="outline"
              onClick={() => {window.location.href = "/api/revoke"}}
            >
              Desconectarse
            </Button>

          </Flex>

        </Box>

      </Flex>
    </header>
    </div>
  )
}

export default Header