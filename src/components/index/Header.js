
import React from 'react'
import { Link as ReachLink } from "react-router-dom"
import {Link, Image, Heading, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import logo from '../../logo.webp'

const Header = () => {
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
        <Flex align="center">
          <Image 
              width="37px"
              height="37px"
              boxSize="37px"
              objectFit="cover"
              src={logo} alt="Sophii Logo"
              />
        <Heading as="h3" size="md">
          <Text as={ReachLink} to="/">{"Sophii <3"}</Text>
        </Heading>        
        </Flex>
        
        <Box paddingRight="10px">
          <Link as={ReachLink} to="/panel">Panel</Link>
        </Box>
      </Flex>
    </header>
    </div>
  )

}
export default Header