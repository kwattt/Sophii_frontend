
import React from 'react'
import { Link as ReachLink } from "react-router-dom"
import {Link, Image, Box, Flex } from "@chakra-ui/react";
import logo from '../../logo.webp'

const Header = () => {

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
        <Box>
          <Image 
              width="37px"
              height="37px"
              boxSize="37px"
              objectFit="cover"
              src={logo} alt="Sophii Logo" />
        </Box>
        <Box paddingRight="10px">
          <Link as={ReachLink} to="/panel">Panel</Link>
        </Box>
      </Flex>
    </header>
    </div>
  )

}
export default Header