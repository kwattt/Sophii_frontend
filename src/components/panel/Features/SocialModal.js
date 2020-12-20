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
  Box,
} from "@chakra-ui/react"

const SocialModal = ({guildInfo, props, Control}) => {
  const {isOpen, onClose} = Control

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

            <DrawerHeader>{props.name}</DrawerHeader>

            <DrawerBody>

              <center><Heading as="h2" size="md">Canal</Heading></center>

              <Select my={5} defaultValue={props.channel}>
                <OptionChannel props={guildInfo.channels}/>
              </Select>

              <center><Heading as="h2" size="md">Aviso</Heading></center>
                <RadioGroup defaultValue={props.type}>
                  <Stack direction="row">
                    <Radio value={0}>Ninguno</Radio>
                    <Radio value={1}>@Here</Radio>
                    <Radio value={2}>@Everyone</Radio>
                  </Stack>
                </RadioGroup>

            </DrawerBody>

            <DrawerFooter>

              <Button colorScheme="purple" mr={5} onClick={onClose}>Cerrar</Button>

              <Button mr={2} colorScheme="red">Eliminar</Button>
              <Button colorScheme="purple">Guardar</Button>

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