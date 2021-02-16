import { Box, Avatar, Heading, ListItem, UnorderedList, Center} from '@chakra-ui/react'

import {propBType} from './../../Panel.d'

const Stats = ({props} : propBType) => {
  const {icon, members, text, voice, name} = props.stats

  return (<>

    <Box borderLeft={lineBox}>
      <Box textAlign="center">
        <Avatar name={name} src={icon}/>
        <Heading as="h4" size="md">{name}</Heading>
      </Box>

      <Box my={7}>
        <Center>
          <UnorderedList>
            <ListItem><b>Miembros: </b>{members}</ListItem>
            <ListItem><b>Canales de texto: </b>{text}</ListItem>
            <ListItem><b>Canales de voz: </b>{voice}</ListItem>
          </UnorderedList>
        </Center>
      </Box>
    </Box>
  </>)
}


const lineBox = "solid #323136 1px"

export default Stats