import { useState } from 'react'
import { useDebounce } from 'use-debounce'

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  DarkMode,
  Heading,
  InputGroup,
  InputLeftAddon,
  Stack
} from "@chakra-ui/react"


import UpdatePoint from './../Features/updatePoint'

const Account = ({data, Control}) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)

  const {isOpen, onClose} = Control

  UpdatePoint(0, vald, data, "/api/updateAccount")

  return (
    <>

      <DarkMode>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Cuenta</DrawerHeader>

            <DrawerBody>

              <Heading mb={6} as="h5" size="sm">
                Cumpleaños
              </Heading>

              {data.enabled === 1 ? 

                <Stack>

                <InputGroup size="sm">
                <InputLeftAddon children="Mes" />
                  <NumberInput 
                    defaultValue={data.month} 
                    min={1} 
                    keepWithinRange={true}
                    max={12}
                    onChange={(v) => {setVals({...vals, month: v})}}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>              
                </InputGroup>

                <InputGroup size="sm">
                <InputLeftAddon children="Día" />
                  <NumberInput 
                    defaultValue={data.day} 
                    min={1} 
                    keepWithinRange={true}
                    max={31}
                  onChange={(v) => {setVals({...vals, day: v})}}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>              
                </InputGroup>

                <center>
                  <Button 
                    size="sm" 
                    borderRadius={0} 
                    colorScheme="red"
                    onClick={() => {setVals({enabled: 0, day: 1, month: 1}); onClose()}}
                  >
                    Deshabilitar
                  </Button>
                </center>

                </Stack>

              :

                <center>
                  <Button 
                    size="sm" 
                    borderRadius={0} 
                    colorScheme="green"
                    onClick={() => {setVals({enabled: 1, day: 1, month: 1}); onClose()}}
                  >
                    Habilitar
                  </Button>
                </center>

              }

            </DrawerBody>

            <DrawerFooter>

              <Button variant="outline" mr={3} onClick={onClose}>
                Cerrar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      </DarkMode>

    </>
  )
}

export default Account
