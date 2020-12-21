import {useState, useEffect} from 'react'

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

  const {isOpen, onClose} = Control

  useEffect(() => {
    setNewProps(props)
  }, [props])

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
              <Select my={5} defaultValue={props.channel}>
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

              <Button mr={2} colorScheme="red">Eliminar</Button>
              {
                (props.type !== "-1" && newProps.name !== "") &&
                  <Button colorScheme="purple">Guardar</Button>
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