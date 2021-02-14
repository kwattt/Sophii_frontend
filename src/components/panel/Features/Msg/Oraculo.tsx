


import { useState } from 'react'
import { useDebounce } from 'use-debounce'

import { 
  Textarea,
  Box,
  Heading,
  Center
} from '@chakra-ui/react'

import UpdatePoint from './../updatePoint'
import Control from './../Alerts/Control'
import { guildInfoT } from '../../Panel.d'

type OraculoT = {
  props : guildInfoT,
  data: any
}

const Oraculo = ({props, data} : OraculoT) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateMsg")

  return (<Box
    borderLeft={lineBox}>

      <Box textAlign="center"><Heading as="h4" size="md">Oráculo</Heading>

      <Heading paddingTop="10px" as="h6" size="xs">Mensajes activos  (r: {1500 - vals.oraculo.length})</Heading>
      </Box>

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
        onChange={(e) => {setVals({...vals, oraculo: e.target.value})}}
        defaultValue={vals.oraculo}
        height={185}
        />

      </Box>
      <Center><Control status={updateStatus}/></Center>

    </Box>)
}

const lineBox = "solid #323136 1px"

export default Oraculo