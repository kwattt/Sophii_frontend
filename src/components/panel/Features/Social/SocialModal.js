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
  Stack,
  Radio,
  RadioGroup
} from "@chakra-ui/react"


const SocialModal = ({props, Control, Values, setValues, guildInfo}) => {
  const {isOpen, onClose} = Control
  const [newProps, setNewProps] = useState(props)

  useEffect(() => {
    setNewProps(props)
  }, [props])

  const onDelete = () => {
    if(props.type !== "-1"){
      var newp = Values.filter((v) => {
        return v.name !== newProps.name
      })
      setValues({twitch: newp})
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
    setValues({twitch: newp})
  }

  return (<>
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
              maxLength={30}
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