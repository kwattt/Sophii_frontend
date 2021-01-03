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
  InputGroup,
  Input,
  Heading,
  Stack,
  InputLeftAddon,
  DarkMode,
  Badge
} from "@chakra-ui/react"


const PurgeModal = ({props, Control, Values, setValues}) => {
  const {isOpen, onClose} = Control
  const [newProps, setNewProps] = useState(props)

  useEffect(() => {
    setNewProps(props)
  }, [props])

  const onDelete = () => {
    var newp = Values.filter((v) => {
      return v.channel !== newProps.channel
    })
    setValues(newp)
    onClose()
  }

  const onSave = () => {
    setValues([...Values, newProps])
    onClose()
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
              <DarkMode>

                <center>
                  <Heading as="h4" size="md" mt={13}>Estado</Heading>
                  {props.active ?
                    <Badge ml="1" fontSize="0.8em" mb={13} colorScheme="green">Activo</Badge>
                  :
                    <Badge ml="1" fontSize="0.8em" mb={13} colorScheme="red">Inactivo</Badge>
                  }
                </center>
                <Stack spacing={1}>
                <InputGroup size ="sm">
                    <InputLeftAddon children="Hora"/>
                    <Input type="number" borderRadius={0} defaultValue={props.hour} onChange={(e) => setNewProps({...newProps, hour: e.target.value})}/>
                  </InputGroup>
                  <InputGroup size ="sm">
                    <InputLeftAddon children="Minuto"/>
                    <Input type="number" borderRadius={0} defaultValue={props.minute} onChange={(e) => setNewProps({...newProps, minute: e.target.value})}/>
                  </InputGroup>
                  <InputGroup size ="sm">
                    <InputLeftAddon children="UTC"/>
                    <Input type="number" borderRadius={0} defaultValue={props.utc} onChange={(e) => setNewProps({...newProps, utc: e.target.value})}/>
                  </InputGroup>
                </Stack>
              </DarkMode>
            </DrawerBody>

            <DrawerFooter>
              <Button colorScheme="purple" mr={5} onClick={onClose}>Cerrar</Button>

              {props.active ?
                <Button mr={2} colorScheme="red"
                onClick={onDelete}>Desactivar</Button>              
              :
                <Button mr={2} colorScheme="green"
                onClick={onSave}>Activar</Button>              
              }

            </DrawerFooter>

          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>)
}

export default PurgeModal