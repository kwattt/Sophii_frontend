import {useState, useEffect} from 'react'

import axios from 'axios'

// Need to redo 

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  Select,
  RadioGroup,
  Stack,
  Radio,
  Input,
} from "@chakra-ui/react"

const SocialModal = ({guildInfo, props, Control, Values, setValues}) => {
  const [newProps, setNewProps] = useState("")
  const [update, setUpdate] = useState(false)

  const {isOpen, onClose} = Control

  useEffect(() => {
    setNewProps(props)
  }, [props])

  useEffect(() => {
    if(update){

      axios.post("http://127.0.0.1:5001/api/update_streams",
      {
        guild: guildInfo.guild,
        streams: Values
      }
      )

      setUpdate(false)
    }
  }, [guildInfo, update, Values])

  const onDelete = () => {
    if(props.type !== "-1"){
      var newp = Values.filter((v) => {
        return v.name !== newProps.name
      })
      setValues(newp)
      setUpdate(true)
    }
  }

  const onSave = () => {
    var newp = Values
    if(props.type !== "-1")
    {
      newp = newp.map(v => 
        v.name === props.name
        ? newProps
        : v
      )
    }
    else {
      newp.push(newProps)
    }
    setValues(newp)
    setUpdate(true)
  }

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerHeader>  
              {props.type !== "-1" 
              ? props.name
              : "Nuevo stream"}
            </DrawerHeader>

            <DrawerBody>

              <center><Heading as="h2" size="md">Canal</Heading></center>
              <Select my={5} defaultValue={props.channel}
              onChange={(e) => {setNewProps({...newProps, channel: e.target.value})}}>
                <OptionChannel props={guildInfo.channels}/>
              </Select>

              <center><Heading my={5} as="h2" size="md">Nombre del streamer</Heading></center>
              <Input placeholder="Ingresar nombre"
                defaultValue={props.name}
                onChange={(e) => {setNewProps({...newProps, name: e.target.value})}}
              ></Input>

              <center><Heading my={5} as="h2" size="md">Aviso</Heading></center>
                <RadioGroup 
                  defaultValue={props.type}
                onChange={(value) => {newProps.type = value}}>
                  <Stack direction="row">
                  <Radio value={"0"}>Ninguno</Radio>
                  <Radio value={"1"}>@Here</Radio>
                  <Radio value={"2"}>@Everyone</Radio>
                  </Stack>
                </RadioGroup>

            </DrawerBody>

            <DrawerFooter>
              <Button colorScheme="purple" mr={5} onClick={onClose}>Cerrar</Button>

              <Button mr={2} colorScheme="red"
              onClick={() => {onDelete(); onClose()}}>Eliminar</Button>
              {
                (newProps.type !== "-1") &&
                  <Button colorScheme="purple"
                  onClick={() => {onSave(); onClose()}}
                  >Guardar</Button>
              }

            </DrawerFooter>

          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
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


export default SocialModal