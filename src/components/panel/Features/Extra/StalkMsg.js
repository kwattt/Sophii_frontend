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

import UpdateExtra from './updateExtra'
import Control from './../Alerts/Control'

const StalkMsg = ({props, data}) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)
  const updateVal = UpdateExtra(props.guild, vald, data)

  return (<Box
    borderLeft={lineBox}>

      <center><Heading as="h4" size="md">Stalk Mensajes</Heading>
      <Heading my="10px" as="h6" size="xs">Mensaje</Heading>
      </center>

      <Textarea
          size="sm"
          border={""}
          my={15}
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