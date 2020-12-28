import {useState, useEffect} from 'react'

import FetchMSG from './fetchMSG'
import CustomScroller from 'react-custom-scroller';

import { 
  Alert,
  AlertIcon,
  Box,
  Heading,
  Textarea,
  Text,
  DarkMode,
  Button
} from '@chakra-ui/react'


const lineBox = "solid #323136 1px"
const Msg = ({props}) => {
  const data = FetchMSG(props.guild) 
  const [msg, setMsg] = useState([])

  useEffect (() => {
    setMsg(data)
  }, [props, data])

  return (<>
  
    <Box
    borderLeft={lineBox}>

      <center><Heading as="h4" size="md">Oráculo</Heading>

      <Heading paddingTop="10px" as="h6" size="xs">Mensajes activos</Heading>
      </center>

      <Box>
        <Textarea
        size="sm"
        border={""}
        my={15}
        borderRadius="sm"
        borderLeft="solid white 2px"
        resize="vertical"
        onChange={(e) => {setMsg(e.target.value)}}
        defaultValue={msg}
        height={185}
        />

      </Box>

      <DarkMode>

        {data !== msg &&
          <center><Button
          size="sm"
          colorScheme="green"
          variant="outline">
            Guardar cambios
          </Button></center>
        }

        <Alert status="warning"
        size="sm"
        mt={15}>
          <AlertIcon/> Utilizar ; para separar los mensajes!
        </Alert>
      </DarkMode>


    {/*
    
      TODO 

      Cambiar API para que haga fetch de valores como canal de mensajes, cumpleaños y colocarlo en el estado de ./../panel.js 

    */}

    </Box>

    <Box
    borderLeft={lineBox}>

      <center><Heading as="h4" size="md">Entrada</Heading>

      <Heading paddingTop="10px" as="h6" size="xs">Mensajes de entrada</Heading>
      </center>
    </Box>

    <Box
    borderLeft={lineBox}>

      <center><Heading as="h4" size="md">Salida</Heading>

      <Heading paddingTop="10px" as="h6" size="xs">Mensajes de salida</Heading>
      </center>
    </Box>

  </>)

}

export default Msg