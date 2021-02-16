import { useState } from 'react'
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
  Textarea,
  InputGroup,
  Alert,
  InputLeftAddon,
} from "@chakra-ui/react"

import UpdatePoint from './../updatePoint'
import Control from './../Alerts/Control'

import {guildInfoT, optionChannelT, channelInfoT} from './../../Panel.d'

type BirthdayTD = {
  bday: string,
  bdaymsg: string,
  bdayutc: number
}

type BirthdayT = {
  props: guildInfoT,
  data: BirthdayTD
}

const Birthday = ({props, data} : BirthdayT) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateExtra")

  return (<>
    <Box
    borderLeft={lineBox}>

    <Box textAlign="center">
      <Heading as="h4" size="md">Cumpleaños</Heading>
      <Heading my="10px" as="h6" size="xs">Canal</Heading>

      <Select 
        defaultValue={data.bday}
        size="sm"
        borderRadius="10"      
        onChange={(e) => {setVals({...vals, bday: e.target.value})}}
      >
        <option value={0}>Deshabilitado</option>
        <OptionChannel props={props.channels}/>
      </Select>

      <Heading my="10px" as="h6" size="xs">Mensaje (r: {350 - vals.bdaymsg.length})</Heading>

      <Textarea
        isInvalid={updateStatus === "invalid"}
        size="sm"
        border={""}
        my={15}
        borderRadius="sm"
        maxLength={350}
        borderLeft="solid white 2px"
        resize="vertical"
        onChange={(e) => {setVals({...vals, bdaymsg: e.target.value})}}
        defaultValue={data.bdaymsg}
        minHeight={95}
        maxHeight={95}
      />

      <Alert 
        status="warning"
        size="sm"
      >
        Utilizar {"{}"} para indicar el nombre.
      </Alert>

      <Heading my="10px" as="h6" size="xs">Zona horaria</Heading>
      
      <InputGroup 
        size="sm"
        borderRadius="10"
      >
        <InputLeftAddon children="UTC"/>
        <NumberInput 
          size="sm" 
          step={1} 
          borderRadius={2} 
          max={14} 
          min={-12} 
          disabled={1}
          inputMode="numeric"
          defaultValue={data.bdayutc}
          onChange={(e) => {setVals({...vals, bdayutc: Number(e)})}}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>      
      </InputGroup>

      <Control status={updateStatus}/>

    </Box>

    </Box>
  </>) 
}

const OptionChannel = ({props} : optionChannelT) => {
  return (
    <>
      {props.map((val : channelInfoT) => {
        return <option key={val.id} value={val.id}>{val.name}</option>
      })
      }
    </>
  )
}

const lineBox = "solid #323136 1px"


export default Birthday