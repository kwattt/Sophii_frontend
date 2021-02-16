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
import { leave } from './Msg.d'

type LeaveT = {
  props: guildInfoT,
  data: leave
}

const Leave = ({props, data} : LeaveT) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateMsg", "leave")

  return (<Box
    borderLeft={lineBox}>

      <Box textAlign="center"><Heading as="h4" size="md">Salida</Heading>

      <Heading paddingTop="10px" as="h6" size="xs">Mensajes de salida  (r: {1500 - vals.length})</Heading>
      </Box>

      <Box>
        <Textarea
          isInvalid={updateStatus === "invalid"}
          size="sm"
          border={""}
          my={15}
          maxlenght={1500}
          borderRadius="sm"
          borderLeft="solid white 2px"
          resize="vertical"
          onChange={(e) => {setVals(e.target.value)}}
          defaultValue={data}
          height={185}
        />
      </Box>
      <Center><Control status={updateStatus}/></Center>

    </Box>)
}

const lineBox = "solid #323136 1px"

export default Leave;