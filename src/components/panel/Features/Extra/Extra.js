import {useEffect, useState} from 'react'

import axios from 'axios'

import FetchExtra from './fetchExtras'
import CustomScroller from 'react-custom-scroller';

import { 
  Box,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spinner,
  Textarea,
  DarkMode,
  Stack,
  CheckboxGroup,
  Checkbox,
  Alert,
  AlertIcon,
  Button,
  Select,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react'

const lineBox = "solid #323136 1px"

const Extra = ({props}) => {

  const data = FetchExtra(props.guild)
  const [oldVal, setOldVal] = useState([])
  const [val, setVal] = useState([])
  const [update, setUpdate] = useState(0)
 

  useEffect(() => {
    if(update === 1){
      setOldVal(val)
      axios.post("http://127.0.0.1:5001/api/updateExtra",
      {
        guild: props.guild,
        role: val.role,
        msg: val.msg,
        bday: val.bday,
        bdaymsg: val.bdaymsg,
        bdayutc: val.bdayutc
      })
      setUpdate(0)
    }
  }, [update, props, val] )

  useEffect(() => {
    setVal({...data})
    setOldVal({...data})
  }, [data])

  return (<>

    {data === "error" &&
      <div id="error">{"No fue posible conectarse al servidor :("}</div>
    }


    { data === "loading" &&      
      <center><Spinner paddingTop="10px" size="lg"/></center>
    }

    
    { data !== "loading" && data !== "error" && val.bdaymsg !== undefined &&
    <><Box
    borderLeft={lineBox}>

      <DarkMode>
      <center><Heading as="h4" size="md">Stalk</Heading>

      <Heading py="10px" as="h6" size="xs">Porcentaje (0-30)</Heading>

      <NumberInput 
        size="sm" 
        step={1} 
        borderRadius={2} 
        max={30} 
        min={0} 
        inputMode="number"
        defaultValue={val.stalk}
        onChange={(e) => {setVal({...val, stalk: e})}}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Heading py="10px" as="h6" size="xs">Roles</Heading>

      </center>

        <Box
        borderLeft={"solid white 2px"}>

          <CustomScroller
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
            onChange={(e) => {setVal({...val, role: e})}}>
              <Stack spacing="0px" marginRight="0.4vw" paddingX="1vw">
                <CheckboxRole props={props.roles}/>
              </Stack>
            </CheckboxGroup>
          </CustomScroller>

        </Box>

        {(!arrayEquals(oldVal.role, val.role) 
          || oldVal.msg !== val.msg 
          || oldVal.stalk !== val.stalk 
          || oldVal.bday !== val.bday 
          || oldVal.bdaymsg !== val.bdaymsg
          || oldVal.bdayutc !== val.bdayutc) && 

          <center>
          <Button
          size="sm"
          colorScheme="green"
          variant="outline"
          onClick={() => {setUpdate(1)}}>
            Guardar cambios
          </Button>
          </center>

        }

      </DarkMode>
    </Box>

    <Box
    borderLeft={lineBox}>

      <center><Heading as="h4" size="md">Stalk Mensajes</Heading></center>

      <Textarea
          size="sm"
          border={""}
          my={15}
          borderRadius="sm"
          borderLeft="solid white 2px"
          resize="vertical"
          onChange={(e) => {setVal({...val, msg: e.target.value})}}
          defaultValue={val.msg}
      height={185}/>

      <DarkMode>
      <Alert status="warning"
          size="sm"
        my={15}>
          <AlertIcon/> Utilizar ; para separar los mensajes!
        </Alert>
      </DarkMode>

    </Box>

    <Box
    borderLeft={lineBox}>

    <center><Heading as="h4" size="md">Cumpleaños</Heading>

    <Heading my="10px" as="h6" size="xs">Canal</Heading>

    <Select 
      defaultValue={val.bday}
      size="sm"
      borderRadius="10"      
    onChange={(e) => {setVal({...val, bday: e.target.value})}}>
      <option value={0}>Deshabilitado</option>
      <OptionChannel props={props.channels}/>
    </Select>

    <Heading my="10px" as="h6" size="xs">Mensaje</Heading>

    <DarkMode>

    <Textarea
          size="sm"
          border={""}
          my={15}
          borderRadius="sm"
          borderLeft="solid white 2px"
          maxLength={150}
          resize="vertical"
          onChange={(e) => {setVal({...val, bdaymsg: e.target.value})}}
          defaultValue={val.bdaymsg}
      minHeight={95}
      maxHeight={95}/>

      <Alert status="warning"
        size="sm">
          Utilizar {"{}"} para indicar el nombre. 
          Carácteres restantes: {150 - val.bdaymsg.length}
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
        defaultValue={val.bdayutc}
        onChange={(e) => {setVal({...val, bdayutc: e})}}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {/*add https://en.wikipedia.org/wiki/List_of_UTC_time_offsets */}
    </InputGroup>
    </DarkMode>
    </center>

    </Box>
    </>}
    
  </>)
}

function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

const OptionChannel = ({props}) => {
  return (
    <>
      {props.map((val) => {
        return <option key={val.id} value={val.id}>{val.name}</option>
      })
      }
    </>
  )
}

const CheckboxRole = ({props}) => {
  return (
    <>
      {props.map((val) => {
        return <Checkbox key={val.id} value={val.id}>{val.name}</Checkbox>
      })
      }
    </>
  )

}

export default Extra