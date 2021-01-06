import { useState } from 'react'
import { useDebounce } from 'use-debounce'

import { 
  Textarea,
  Box,
  Heading,

} from '@chakra-ui/react'

import UpdatePoint from './../updatePoint'
import Control from './../Alerts/Control'

const Oraculo = ({props, data}) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateMsg")

  return (<Box
    borderLeft={lineBox}>

      <center><Heading as="h4" size="md">Entrada</Heading>

      <Heading paddingTop="10px" as="h6" size="xs">Mensajes de entrada (r: {1500 - vals.join.length})</Heading>
      </center>

      <Box>
        <Textarea
        isInvalid={updateStatus === "invalid"}
        size="sm"
        border={""}
        my={15}
        maxLength={1500}
        borderRadius="sm"
        borderLeft="solid white 2px"
        resize="vertical"
        onChange={(e) => {setVals({...vals, join: e.target.value})}}
        defaultValue={vals.join}
        height={185}
        />

      </Box>
      <center><Control status={updateStatus}/></center>

    </Box>)
}

const lineBox = "solid #323136 1px"

export default Oraculo