import {useState, useEffect} from 'react'

/* NEEDS HARD CLEANUP

  El cleanup de useEffect es incorrecto, utilizar cancelación de axios (actual no utiliza cancel de manera correcta.).

*/

import FetchMSG from './fetchMSG'
import updateGuild from './../updateGuild'
import axios from 'axios'

import { 
  Alert,
  AlertIcon,
  Box,
  Heading,
  Textarea,
  DarkMode,
  Button,
  Select,
  Spinner
} from '@chakra-ui/react'

const lineBox = "solid #323136 1px"

const Msg = ({props, setProps}) => {
  const [update, setUpdate] = useState(0)
  const data = FetchMSG(props.guild) 
  const [msg, setMsg] = useState([])
  const [oldMsg, setOldMsg] = useState([])
  const [invalid, setInvalid] = useState([false, false, false])

  useEffect (() => {
    setMsg(data)
    setOldMsg(data)
  }, [data])

  useEffect(() => {
    let cancel = false

    if(update === 1){
      updateGuild(props)
      setUpdate(0)
    }
    else if(update === 2){
      axios.post("http://127.0.0.1:5001/api/updateMsg",
      {
        guild: props.guild,
        oraculo: msg.oraculo,
        welcome: msg.join,
        leave: msg.leave
      }).then(response => {
        if(!cancel){
          setInvalid([false, false, false])
          setOldMsg(msg)  
        }
      }).catch(content => {
        if(!cancel){
          var old = invalid 
          old.splice(content.response.data.invalid, 1, true)
          setInvalid(old)  
        }
      })
      setUpdate(0)
    }

    return() => {
      cancel = true
    }

  }, [update, msg, props, invalid])

  return (<>

    {data === "error" &&
      <div id="error">{"No fue posible conectarse al servidor :("}</div>
    }


    { data === "loading" &&      
      <center><Spinner paddingTop="10px" size="lg"/></center>
    }

    {
      data !== "loading" && data !== "error" &&
    <><Box
    borderLeft={lineBox}>
      <DarkMode>

      <center><Heading as="h4" size="md">Canales</Heading>

      <Heading paddingTop="10px" as="h6" size="xs">Entrada/Salida</Heading>
      <Select my={5} defaultValue={props.welcome}
      disabled={update !== 0 ? 1 : 0}
      size="sm"
      onChange={(e) => {setProps({...props, welcome: e.target.value}); setUpdate(1)}}>
        <OptionChannel props={props.channels}/>
      </Select>

      </center>
      
        <Alert status="warning"
          size="sm"
        my={15}>
          <AlertIcon/> Utilizar ; para separar los mensajes!
        </Alert>


      <center>
      {(oldMsg !== msg && update === 0) &&
        <Button
        size="sm"
        colorScheme="green"
        variant="outline"
        onClick={() => {setUpdate(2)}}>
          Guardar cambios
        </Button>
      }
      </center>
      
      </DarkMode>
      
    </Box>

    <Box
    borderLeft={lineBox}>

      <center><Heading as="h4" size="md">Oráculo</Heading>

      <Heading paddingTop="10px" as="h6" size="xs">Mensajes activos</Heading>
      </center>

      <Box>
        <Textarea
        isInvalid={invalid[0] === true}
        size="sm"
        border={""}
        my={15}
        borderRadius="sm"
        borderLeft="solid white 2px"
        resize="vertical"
        onChange={(e) => {setMsg({...msg, oraculo: e.target.value})}}
        defaultValue={msg.oraculo}
        height={185}
        />

      </Box>

    </Box>

    <Box
    borderLeft={lineBox}>

      <center><Heading as="h4" size="md">Entrada</Heading>

      <Heading paddingTop="10px" as="h6" size="xs">Mensajes de entrada</Heading>
      </center>

      <Box>
        <Textarea
        isInvalid={invalid[1] === true}
        size="sm"
        border={""}
        my={15}
        borderRadius="sm"
        borderLeft="solid white 2px"
        resize="vertical"
        onChange={(e) => {setMsg({...msg, join: e.target.value})}}
        defaultValue={msg.join}
        height={185}
        />

      </Box>

    </Box>

    <Box
    borderLeft={lineBox}>

      <center><Heading as="h4" size="md">Salida</Heading>

      <Heading paddingTop="10px" as="h6" size="xs">Mensajes de salida</Heading>
      </center>

      <Box>
        <Textarea
        isInvalid={invalid[2] === true}
        size="sm"
        border={""}
        my={15}
        borderRadius="sm"
        borderLeft="solid white 2px"
        resize="vertical"
        onChange={(e) => {setMsg({...msg, leave: e.target.value})}}
        defaultValue={msg.leave}
        height={185}
        />

      </Box>

    </Box></>
    }

  </>)

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

export default Msg