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
  RadioGroup,
  Radio,
  Stack
} from "@chakra-ui/react"


const SocialModal = ({props, Control, Values, setValues, guildInfo}) => {
  const {isOpen, onClose} = Control
  const [newProps, setNewProps] = useState(props)

  useEffect(() => {
    setNewProps(props)
  }, [props])

  const onDelete = () => {
    if(props.name !== "Nuevo perfil"){
      var newp = Values.filter((v) => {
        return v.name !== newProps.name
      })
      setValues({twitter: newp})
    }
  }

  const onSave = () => {
    var newp = Values
    if(props.name !== "Nuevo perfil")
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
    setValues({twitter: newp})
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
            {props.name}
          </DrawerHeader>

          <DrawerBody>

            <center><Heading as="h2" size="md">Canal</Heading></center>
            <Select my={5} defaultValue={props.channel}
            onChange={(e) => {setNewProps({...newProps, channel: e.target.value})}}>
              <OptionChannel props={guildInfo.channels}/>
            </Select>

            <center><Heading my={5} as="h2" size="md">Nombre del perfil</Heading></center>
            <Input placeholder="Ingresar nombre"
              defaultValue={props.name}
              maxLength={30}
              onChange={(e) => {setNewProps({...newProps, name: e.target.value})}}
            ></Input>

            <center><Heading my={5} as="h2" size="md">Aviso</Heading></center>
              <RadioGroup 
                defaultValue={props.type}
                onChange={(value) => {setNewProps({...newProps, type: value})}}
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

          {props.name !== "Nuevo perfil" &&
            <Button mr={2} colorScheme="red" variant="outline"
            onClick={() => {onDelete(); onClose()}}>Eliminar</Button>
          }

            {
              (newProps.name !== "Nuevo perfil" && newProps.type !== "-1") &&
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