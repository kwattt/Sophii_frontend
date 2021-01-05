import { useState } from 'react'
import { useDebounce } from 'use-debounce'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  InputGroup,
  InputLeftAddon,
  Stack,
  Avatar,
  Flex,
  Divider,
  IconButton,
  useColorMode,
  Switch
} from "@chakra-ui/react"

import {BsMoon, BsSun} from 'react-icons/bs'

import UpdatePoint from './../Features/updatePoint'

const Account = ({data, Control}) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 100)
  const { colorMode, toggleColorMode } = useColorMode()

  const {isOpen, onClose} = Control

  UpdatePoint(0, vald, data, "/api/updateAccount")
  // BsMoon
  return (
    <>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
          <ModalHeader pb={0}>
            <Flex align="center" justify="space-between" wrap="wrap">
              <Flex align="center" >
                <Avatar name={data.name} src={data.avatar}/>
                <Heading as="h5" size="sm" ml={2}>{data.name}</Heading>
              </Flex>
              <IconButton 
                aria-label="Tema"  
                onClick={toggleColorMode}
                icon={colorMode === "light" ? <BsSun /> : <BsMoon/>} />
            </Flex>
            <Divider my={2}/>
          </ModalHeader>
          <ModalBody>

            <Flex align="center" justify="space-between" wrap="wrap">
              <Heading as="h5" size="sm" py={2}>Cumpleaños</Heading>
              <Switch defaultIsChecked={data.enabled} onChange={(e) => {setVals({enabled: e.target.checked, day: 1, month: 1}); onClose()}}/>
            </Flex>
            
            {data.enabled === 1 &&

              <Stack spacing={1}>

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

              </Stack>

            }

            </ModalBody>
            <ModalFooter mb={0}>
              <Button colorScheme="blue" mr={3} onClick={onClose}>Cerrar</Button>  
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
  )
}

export default Account
