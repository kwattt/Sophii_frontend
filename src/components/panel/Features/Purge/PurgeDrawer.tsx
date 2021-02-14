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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,  
  Heading,
  Stack,
  InputLeftAddon,
  Badge,
  Box
} from "@chakra-ui/react"

import {ControlT} from './../../Panel.d'

type PurgeDrawerT = {
  props: any,
  Control: ControlT,
  Values: any,
  setValues: any,
}

const PurgeDrawer = ({props, Control, Values, setValues} : PurgeDrawerT) => {
  const {isOpen, onClose} = Control
  const [newProps, setNewProps] = useState(props)

  useEffect(() => {
    setNewProps(props)
  }, [props])

  const onDelete = () => {
    var newp = Values.filter((v : any) => {
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
                <Box textAlign="center">
                  <Heading as="h4" size="md" mt={13}>Estado</Heading>
                  {props.active ?
                    <Badge ml="1" fontSize="0.8em" mb={13} colorScheme="green">Activo</Badge>
                  :
                    <Badge ml="1" fontSize="0.8em" mb={13} colorScheme="red">Inactivo</Badge>
                  }
                </Box>
                <Stack spacing={1}>
                <InputGroup size ="sm">
                    <InputLeftAddon children="Hora"/>
                    <NumberInput 
                      size="sm" 
                      step={1} 
                      borderRadius={2} 
                      max={23} 
                      min={0} 
                      inputMode="numeric"
                      defaultValue={props.hour}
                      onChange={(e) => {setNewProps({...newProps, hour: e})}}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

                  </InputGroup>
                  <InputGroup size ="sm">
                    <InputLeftAddon children="Minuto"/>
                    <NumberInput 
                      size="sm" 
                      step={1} 
                      borderRadius={2} 
                      max={59} 
                      min={0} 
                      inputMode="numeric"
                      defaultValue={props.minute}
                      onChange={(e) => {setNewProps({...newProps, minute: e})}}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

                  </InputGroup>
                  <InputGroup size ="sm">
                    <InputLeftAddon children="UTC"/>
                    <NumberInput 
                      size="sm" 
                      step={1} 
                      borderRadius={2} 
                      max={14} 
                      min={-12} 
                      disabled={1}
                      inputMode="numeric"
                      defaultValue={props.utc}
                      onChange={(e) => {setNewProps({...newProps, utc: e})}}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </InputGroup>
                </Stack>
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

export default PurgeDrawer;