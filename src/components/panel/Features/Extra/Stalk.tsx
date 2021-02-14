import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Scrollbars } from 'react-custom-scrollbars-2';

import { 
  Box,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Stack, 
  CheckboxGroup,
  Checkbox,
  Center
} from '@chakra-ui/react'

import UpdatePoint from './../updatePoint'
import Control from './../Alerts/Control'
import {guildInfoT, optionRolesT, roleInfoT} from './../../Panel.d'

type StalkT = {
  props: guildInfoT,
  data: any
}

const Stalk = ({props, data} : StalkT) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateExtra")

return (<>
  
  <Box
    borderLeft={lineBox}>
  
      <Box textAlign="center">
        <Heading as="h4" size="md">Stalk</Heading>
        <Heading py="10px" as="h6" size="xs">Porcentaje (0-30)</Heading>
        <NumberInput 
          size="sm" 
          step={1} 
          borderRadius={2} 
          max={30} 
          min={0} 
          inputMode="numeric"
          defaultValue={data.stalk}
          onChange={(e) => {setVals({...vals, stalk: e})}}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <Heading py="10px" as="h6" size="xs">Roles</Heading>

      </Box>

        <Box
        borderLeft={"solid white 2px"}>

          <Scrollbars
              style={{
                marginTop: "15px",
                marginBottom: "15px",
                height: "142px",
                textAlign: "justify",
              }}
            >
            <CheckboxGroup 
              colorScheme="purple"
              defaultValue={data.role}
              onChange={(e) => {setVals({...vals, role: e})}}
            >
              <Stack spacing="0px" marginRight="0.4vw" paddingX="1vw">
                <CheckboxRole props={props.roles}/>
              </Stack>
            </CheckboxGroup>
          </Scrollbars>

        </Box>
          <Center><Control status={updateStatus}/></Center>
    </Box>
  </>
  )
}
const lineBox = "solid #323136 1px"

const CheckboxRole = ({props} : optionRolesT) => {
  return (
    <>
      {props.map((val: roleInfoT) => {
        return <Checkbox key={val.id} value={val.id}>{val.name}</Checkbox>
      })
      }
    </>
  )
}

export default Stalk;