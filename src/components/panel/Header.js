
import {useState} from 'react'
import logo from '../../logo.webp'

import {BiLogOut, BiWrench, BiMenu} from 'react-icons/bi'

import {
  Image,
  Box,
  IconButton,
  Flex,
  Button,
  Heading,
} from "@chakra-ui/react";

const Header = () => {
  const [menu, setMenu] = useState(false)

  return (
    <div>
    <header>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="10px"
        bg="gray.800"
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
          {"Sophii <3"}
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
            <Button marginRight="10px" leftIcon={<BiWrench />} colorScheme="teal" variant="outline">
              Cuenta
            </Button>

            <Button leftIcon={<BiLogOut />} colorScheme="pink" variant="outline">
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