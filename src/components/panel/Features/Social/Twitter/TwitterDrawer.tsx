import {useState, useEffect, Dispatch} from 'react'

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
  Stack,
  Box
} from "@chakra-ui/react"
import { optionChannelT, channelInfoT, ControlT, guildInfoT } from '../../../Panel.d'
import {TwitterT} from './Twitter.d'

type TwitterDrawerT = {
  props: TwitterT,
  Control: ControlT,
  Values: Array<TwitterT>,
  setValues: Dispatch<TwitterT[]>,
  guildInfo: guildInfoT
}

const TwitterDrawer = ({props, Control, Values, setValues, guildInfo} : TwitterDrawerT) => {
  const {isOpen, onClose} = Control
  const [newProps, setNewProps] = useState(props)

  useEffect(() => {
    setNewProps(props)
  }, [props])

  const onDelete = () => {
    if(props.name !== "Nuevo perfil"){
      var newp = Values.filter((v : TwitterT) => {
        return v.name !== newProps.name
      })
      setValues(newp)
    }
  }

  const onSave = () => {
    var newp = Values
    if(props.name !== "Nuevo perfil")
    {
      newp = newp.map((v : TwitterT) => 
        v.name === props.name
        ? newProps
        : v
      )
    }
    else {
      newp = [...newp, newProps]
    }
    setValues(newp)
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

            <Box textAlign="center"><Heading as="h2" size="md">Canal</Heading></Box>
            <Select my={5} defaultValue={props.channel}
            onChange={(e) => {setNewProps({...newProps, channel: e.target.value})}}>
              <OptionChannel props={guildInfo.channels}/>
            </Select>

            <Box textAlign="center"><Heading my={5} as="h2" size="md">Nombre del perfil</Heading></Box>
            <Input placeholder="Ingresar nombre"
              defaultValue={props.name}
              maxLength={30}
              onChange={(e) => {setNewProps({...newProps, name: e.target.value})}}
            ></Input>

            <Box textAlign="center"><Heading my={5} as="h2" size="md">Aviso</Heading></Box>
              <RadioGroup 
                defaultValue={props.type.toString()}
                onChange={(value) => {setNewProps({...newProps, type: Number(value)})}}
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
              (newProps.name !== "Nuevo perfil" && newProps.type !== -1) &&
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

const OptionChannel = ({props} : optionChannelT) => {
  return (
    <>
      {props.map((val : channelInfoT) => {
        return <option key={val.id} value={val.id}>{val.name}</option>
      })
      }
    </>
  )
}

export default TwitterDrawer;