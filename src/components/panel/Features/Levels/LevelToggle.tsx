import { useState } from 'react'
import { useDebounce } from 'use-debounce'

import { Scrollbars } from 'react-custom-scrollbars-2';

import { 
  Box,
  Heading,
  Checkbox,
  Switch,
  Stack,
  Center,
  CheckboxGroup,

} from '@chakra-ui/react'

import UpdatePoint from './../updatePoint'
import Control from './../Alerts/Control'

import {guildInfoT, optionChannelT, channelInfoT} from './../../Panel.d'

type ToggleLevelT = {
  props: guildInfoT,
  data: any
}

const ToggleLevel = ({props, data} : ToggleLevelT) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateLevels")

  return (<>
  
  <Box
    borderLeft={lineBox}>
  
      <Box textAlign="center">
        <Heading as="h4" size="md">Niveles</Heading>
        <Heading py="10px" as="h6" size="xs">Estado</Heading>
      </Box>

      <Center>
        <Box>
          <b>Activado</b>
          <Switch 
            ml={3} 
            colorScheme="green" 
            defaultIsChecked={data.enabled}
            onChange={(e) => {setVals({...vals, enabled: e.target.checked})}}
            />
        </Box> 
      </Center>

      <Box textAlign="center"><Heading py="10px" as="h6" size="xs">Canales deshabilitados</Heading></Box>

      <Scrollbars
        style={{
          marginTop: "15px",
          marginBottom: "15px",
          height: "214px",
          textAlign: "justify",
          borderLeft: "solid white 2px"
        }}
      >

        <Stack spacing="0px" marginRight="0.4vw" paddingX="1vw">

          <CheckboxGroup 
            colorScheme="purple"
            defaultValue={data.channels}
            onChange={(e) => {setVals({...vals, channels: e})}}
          >
            <CheckboxChannel props={props.channels}/>
          </CheckboxGroup>

        </Stack>
        
      </Scrollbars>

      <Center><Control status={updateStatus}/></Center>
    </Box>

  </>

  )

}
const lineBox = "solid #323136 1px"

const CheckboxChannel = ({props} : optionChannelT) => {
  return (
    <>
      {props.map((val: channelInfoT) => {
        return <Checkbox key={val.id} value={val.id}>{val.name}</Checkbox>
      })
      }
    </>
  )
}

export default ToggleLevel;