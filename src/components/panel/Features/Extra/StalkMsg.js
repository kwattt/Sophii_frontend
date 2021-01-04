import { useState } from 'react'
import { useDebounce } from 'use-debounce'

import { 
  Box,
  DarkMode,
  Heading,
  Textarea,
  Alert,
  AlertIcon
} from '@chakra-ui/react'

/*
  Using:
  msg
*/

import UpdatePoint from './../updatePoint'
import Control from './../Alerts/Control'

const StalkMsg = ({props, data}) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)
  const updateVal = UpdatePoint(props.guild, vald, data, "/api/updateExtra")

  return (<Box
    borderLeft={lineBox}>

      <center><Heading as="h4" size="md">Stalk Mensajes</Heading>
      <Heading my="10px" as="h6" size="xs">Mensaje (r: {1000 - vals.msg.length})</Heading>
      </center>

      <Textarea
          size="sm"
          border={""}
          my={15}
          maxLength={1000}
          borderRadius="sm"
          borderLeft="solid white 2px"
          resize="vertical"
          onChange={(e) => {setVals({...vals, msg: e.target.value})}}
          defaultValue={vals.msg}
      height={185}/>

      <DarkMode>
      <Alert status="warning"
          size="sm"
        my={15}>
          <AlertIcon/> Utilizar ; para separar los mensajes!
        </Alert>
      </DarkMode>

      <center><Control status={updateVal}/></center>

    </Box>
  )
}

const lineBox = "solid #323136 1px"

export default StalkMsg