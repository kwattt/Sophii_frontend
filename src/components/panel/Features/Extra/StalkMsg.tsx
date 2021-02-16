import { useState } from 'react'
import { useDebounce } from 'use-debounce'

import { 
  Box,
  Heading,
  Textarea,
  Alert,
  AlertIcon,
  Center
} from '@chakra-ui/react'

import UpdatePoint from './../updatePoint'
import Control from './../Alerts/Control'

import {guildInfoT} from './../../Panel.d'

type StalkMsgT = {
  props: guildInfoT,
  data: string
}

const StalkMsg = ({props, data} : StalkMsgT) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)
  const updateVal = UpdatePoint(props.guild, vald, data, "/api/updateExtra", "msg")

  return (<Box
    borderLeft={lineBox}
  >

      <Box textAlign="center">
        <Heading as="h4" size="md">Stalk Mensajes</Heading>
        <Heading my="10px" as="h6" size="xs">Mensaje (r: {1000 - vals.length})</Heading>
      </Box>

      <Textarea
          size="sm"
          border={""}
          my={15}
          maxLength={1000}
          borderRadius="sm"
          borderLeft="solid white 2px"
          resize="vertical"
          onChange={(e) => {setVals(e.target.value)}}
          defaultValue={data}
      height={185}/>

      <Alert status="warning"
          size="sm"
        my={15}>
          <AlertIcon/> Utilizar ; para separar los mensajes!
      </Alert>
      <Center><Control status={updateVal}/></Center>

    </Box>
  )
}

const lineBox = "solid #323136 1px"

export default StalkMsg;