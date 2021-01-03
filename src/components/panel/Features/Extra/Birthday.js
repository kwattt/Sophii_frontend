import { useState, memo } from 'react'
import { useDebounce } from 'use-debounce'
import { 
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Heading,
  Select,
  DarkMode,
  Textarea,
  InputGroup,
  Alert,
  InputLeftAddon,
} from "@chakra-ui/react"

import UpdatePoint from './../updatePoint'
import Control from './../Alerts/Control'


const Birthday = ({props, data}) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateExtra")

  return (<>
    <Box
    borderLeft={lineBox}>

    <center><Heading as="h4" size="md">Cumpleaños</Heading>

    <Heading my="10px" as="h6" size="xs">Canal</Heading>

    <Select 
      defaultValue={data.bday}
      size="sm"
      borderRadius="10"      
    onChange={(e) => {setVals({...vals, bday: e.target.value})}}>
      <option value={0}>Deshabilitado</option>
      <OptionChannel props={props.channels}/>
    </Select>

    <Heading my="10px" as="h6" size="xs">Mensaje</Heading>

    <DarkMode>

    <Textarea
      isInvalid={updateStatus === "invalid" ? 1 : 0}
      size="sm"
      border={""}
      my={15}
      borderRadius="sm"
      borderLeft="solid white 2px"
      maxLength={150}
      resize="vertical"
      onChange={(e) => {setVals({...vals, bdaymsg: e.target.value})}}
      defaultValue={data.bdaymsg}
    minHeight={95}
    maxHeight={95}/>

      <Alert status="warning"
        size="sm">
          Utilizar {"{}"} para indicar el nombre. 
          Carácteres restantes: {150 - vals.bdaymsg.length}
      </Alert>

    <Heading my="10px" as="h6" size="xs">Zona horaria</Heading>
    <InputGroup 
      size="sm"
    borderRadius="10">
      <InputLeftAddon children="UTC"/>
      <NumberInput 
        size="sm" 
        step={1} 
        borderRadius={2} 
        max={14} 
        min={-12} 
        disabled={1}
        inputMode="number"
        defaultValue={data.bdayutc}
        onChange={(e) => {setVals({...vals, bdayutc: e})}}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      
      {/*add https://en.wikipedia.org/wiki/List_of_UTC_time_offsets */}
    </InputGroup>
    
    </DarkMode>

    <Control status={updateStatus}/>

    </center>

    </Box>
  </>) 
}

const OptionChannel = memo(({props}) => {
  return (
    <>
      {props.map((val) => {
        return <option key={val.id} value={val.id}>{val.name}</option>
      })
      }
    </>
  )
})


const lineBox = "solid #323136 1px"


export default Birthday