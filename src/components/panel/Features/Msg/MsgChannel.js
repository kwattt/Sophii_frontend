import { useState, memo } from 'react'
import { useDebounce } from 'use-debounce'

import { 
  Alert,
  AlertIcon,
  Box,
  DarkMode,
  Heading,
  Select
} from '@chakra-ui/react'

import UpdatePoint from './../updatePoint'
import Control from './../Alerts/Control'

const MsgChannel = ({props, data}) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)

  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateMsg")

  return (<Box
    borderLeft={lineBox}>

      <DarkMode>
      <center><Heading as="h4" size="md">Canales</Heading>

      <Heading paddingTop="10px" as="h6" size="xs">Entrada/Salida</Heading>

      <Select my={5} defaultValue={props.channel}

      size="sm"
      onChange={(e) => {setVals({...vals, channel: e.target.value})}}>
        <OptionChannel props={props.channels}/>
      </Select>

      </center>
      
        <Alert status="warning"
          size="sm"
        my={15}>
          <AlertIcon/> Utilizar ; para separar los mensajes!
            <br/>
              Utiliza {"{}"} para indicar nombre del usuario!
        </Alert>
      
      </DarkMode>

      <center><Control status={updateStatus}/></center>

  </Box>)
}

const lineBox = "solid #323136 1px"

const OptionChannel = memo(({props}) => {
  return (
    <>
      {props.map((val) => {
        return <option key={val.id} value={"" + val.id}>{val.name}</option>
      })
      }
    </>
  )
})

export default MsgChannel