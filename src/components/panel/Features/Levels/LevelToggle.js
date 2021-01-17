import { useState, memo } from 'react'
import { useDebounce } from 'use-debounce'

import CustomScroller from 'react-custom-scroller';

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

const Stalk = ({props, data}) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateLevels")
  console.log(data)
return (<>
  
  <Box
    borderLeft={lineBox}>
  
      <center><Heading as="h4" size="md">Niveles</Heading>

      <Heading py="10px" as="h6" size="xs">Estado</Heading></center>

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

      <center><Heading py="10px" as="h6" size="xs">Canales deshabilitados</Heading></center>

      <CustomScroller
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
        
      </CustomScroller>

      <center><Control status={updateStatus}/></center>
    </Box>

  </>

  )

}
const lineBox = "solid #323136 1px"

const CheckboxChannel = memo(({props}) => {
  return (
    <>
      {props.map((val) => {
        return <Checkbox key={val.id} value={val.id}>{val.name}</Checkbox>
      })
      }
    </>
  )
})

export default Stalk