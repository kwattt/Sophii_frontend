import {useState, useEffect, memo} from 'react'

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
  Box
} from "@chakra-ui/react"

// we need to verify the channel id in the drawer before saving the data.

import axios from 'axios'

const base_url = process.env.REACT_APP_BASE_URL

const SocialModal = ({props, Control, Values, setValues, guildInfo}) => {
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

  const onIdChange = (nId) => {
    if(nId !== newProps.name){
      setVerified(false)
    }
    else setVerified(true)
    setNewProps({...newProps, name: nId})
  }

  const onDelete = () => {
    if(props.name !== "Nuevo canal"){
      var newp = Values.filter((v) => {
        return v.name !== newProps.name
      })
      setValues({youtube: newp})
    }
  }

  const onSave = () => {
    var newp = Values
    if(props.name !== "Nuevo canal")
    {
      newp = newp.map(v => 
        v.name === props.name
        ? newProps
        : v
      )
    }
    else {
      newp = [...newp, newProps]
    }
    setValues({youtube: newp})
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

          <center><Heading as="h2" size="md">Canal</Heading></center>
            <Select my={5} defaultValue={props.channel}
            onChange={(e) => {setNewProps({...newProps, channel: e.target.value})}}>
              <OptionChannel props={guildInfo.channels}/>
          </Select>

          <center><Heading my={5} as="h2" size="md"><b>ID</b> del canal</Heading></center>
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

          </DrawerBody>

          <DrawerFooter>

          <Button mr={5} onClick={onClose}>Cerrar</Button>

            {props.name !== "Nuevo canal" &&
              <Button mr={2} colorScheme="red" variant="outline"
              onClick={() => {onDelete(); onClose()}}>Eliminar</Button>
            }

            {
              (verified) &&
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

export default SocialModal