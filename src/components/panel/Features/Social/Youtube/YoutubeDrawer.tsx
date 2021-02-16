import {useState, useEffect, Dispatch} from 'react'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Select,
  Input,
  Heading,
  Badge,
  Box,
  RadioGroup,
  Radio,
  Stack
} from "@chakra-ui/react"

import axios from 'axios'
import { channelInfoT, ControlT, guildInfoT, optionChannelT } from '../../../Panel.d'
import { YoutubeT } from './Youtube.d'

const base_url = process.env.REACT_APP_BASE_URL

type YoutubeDrawerT = {
  props: YoutubeT,
  Control: ControlT,
  Values: Array<YoutubeT>,
  setValues: Dispatch<YoutubeT[]>,
  guildInfo: guildInfoT
}

const YoutubeDrawer = ({props, Control, Values, setValues, guildInfo} : YoutubeDrawerT) => {
  const {isOpen, onClose} = Control
  const [newProps, setNewProps] = useState(props)
  const [verified, setVerified] = useState(false)
  const [toVerify, setToVerify] = useState(false)

  useEffect(() => {
    if(props.channel_name === "Nuevo canal") setVerified(false)
    else setVerified(true)

    setNewProps({...props, error: false})
  }, [props])  

  useEffect(() => {
    const sendData = async () => {
      axios.post(base_url + '/api/verifyChannel',
      {
        guild: guildInfo.guild,
        data: {
          channelId: newProps.name
        }
      }).then((res) => {
          setVerified(true)
          setNewProps({...newProps, channel_name: res.data.channelName, error: false})
        }).catch(() => {
          setVerified(false)
          setNewProps({...newProps, error: true})
      })
    }

    if(toVerify)
    { 
      sendData()
      setToVerify(false)
    }

  }, [toVerify, guildInfo, newProps])

  const onIdChange = (nId : string) => {
    if(nId !== newProps.name){
      setVerified(false)
    }
    else setVerified(true)
    setNewProps({...newProps, name: nId})
  }

  const onDelete = () => {
    if(props.name !== "Nuevo canal"){
      var newp = Values.filter((v : YoutubeT) => {
        return v.name !== newProps.name
      })
      setValues(newp)
    }
  }

  const onSave = () => {
    var newp = Values
    if(props.name !== "Nuevo canal")
    {
      newp = newp.map((v : YoutubeT) => 
        v.name === props.name
        ? newProps
        : v
      )
    }
    else {
      newp = [...newp, newProps]
    }
    setValues(newp)
  }


  return (<>

    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
    >
      <DrawerOverlay>
        <DrawerContent>

          <DrawerHeader>
            {props.channel_name}
            <DrawerCloseButton/>
          </DrawerHeader>
          <DrawerBody>

          <Box textAlign="center"><Heading as="h2" size="md">Canal</Heading></Box>
            <Select my={5} defaultValue={props.channel}
            onChange={(e) => {setNewProps({...newProps, channel: e.target.value})}}>
              <OptionChannel props={guildInfo.channels}/>
          </Select>

          <Box textAlign="center"><Heading my={5} as="h2" size="md"><b>ID</b> del canal</Heading></Box>
            <Input placeholder="Ingresar nombre"
              defaultValue={props.name}
              maxLength={200}
              onChange={(e) => {onIdChange(e.target.value)}}
            ></Input>


          <Box mt={3}>
            {(!verified && newProps.name !== "Nuevo canal" && newProps.name !== "") &&
              <Button
                size="sm"
                borderRadius=""
                colorScheme={newProps.error ? "red" : "purple"}
                variant="outline"
                onClick={() => {setToVerify(true)}}
              >{newProps.error ? "Error, buscar de nuevo." : "Buscar"}</Button>
            }

            {verified &&
              <><b>Canal: </b> <Badge variant="solid" colorScheme="green">{newProps.channel_name}</Badge></>
            }
          </Box>

          <Box textAlign="center"><Heading my={5} as="h2" size="md">Aviso</Heading></Box>
            <RadioGroup 
              defaultValue={props.type.toString()}
              onChange={(value) => {setNewProps({...newProps, type: Number(value)})}}
            >
              <Stack direction="row">
                <Radio value={"0"}>Ninguno</Radio>
                <Radio value={"1"}>@Here</Radio>
                <Radio value={"2"}>@Everyone</Radio>
              </Stack>
          </RadioGroup>

          </DrawerBody>

          <DrawerFooter>

          <Button mr={5} onClick={onClose}>Cerrar</Button>

            {(props.name !== "Nuevo canal") &&
              <Button mr={2} colorScheme="red" variant="outline"
              onClick={() => {onDelete(); onClose()}}>Eliminar</Button>
            }

            {
              (verified && newProps.type !== -1) &&
                <Button colorScheme="purple" variant="outline"
                onClick={() => {onSave(); onClose()}}
                >Guardar</Button>
            }

          </DrawerFooter>

        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
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

export default YoutubeDrawer;