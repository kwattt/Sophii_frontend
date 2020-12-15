
import React from 'react'
import {Link, Image, Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import logo from '../../logo.png'

const Header = () => {

  return (
    <div>
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
            boxSize="37px"
            objectFit="cover"
            src={logo} alt="Sophii Logo" />
      </Box>
      <Box paddingRight="10px">
        <Link>Panel</Link>
      </Box>
    </Flex>
    </div>
  )

}

export default Header