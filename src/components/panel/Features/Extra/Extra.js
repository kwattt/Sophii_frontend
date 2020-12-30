import {useEffect, useState} from 'react'

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
  Button
} from '@chakra-ui/react'

const lineBox = "solid #323136 1px"

const Extra = ({props, setProps}) => {
  const data = FetchExtra(props.guild)
  const [oldVal, setOldVal] = useState([]) 
  const [val, setVal] = useState([]) 

  useEffect(() => {
    setVal({...data, percent: props.stalk.toString()})
    setOldVal({...data, percent: props.stalk.toString()})
  }, [data, props])

  return (<>

    {data === "error" &&
      <div id="error">{"No fue posible conectarse al servidor :("}</div>
    }


    { data === "loading" &&      
      <center><Spinner paddingTop="10px" size="lg"/></center>
    }

    
    { data !== "loading" && data !== "error" &&
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
        inputMode="numer"
        defaultValue={props.stalk}
        onChange={(e) => {setVal({...val, percent: e})}}>
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

        {(!arrayEquals(oldVal.role, val.role) || oldVal.msg !== val.msg || oldVal.percent !== val.percent) && 

          <center>
          <Button
          size="sm"
          colorScheme="green"
          variant="outline"
          onClick={() => {}}>
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
    </>}
    
  </>)
}

function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
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