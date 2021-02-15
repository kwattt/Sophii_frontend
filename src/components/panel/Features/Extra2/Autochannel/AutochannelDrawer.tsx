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
  Box,
  Heading,
  Select
} from "@chakra-ui/react"

import {channelInfoT, ControlT, guildInfoT, optionChannelT} from '../../../Panel.d'
import {AutoCT} from './../Extra2.d'

type AutochannelDrawerT = {
  props: AutoCT,
  Control: ControlT,
  Values: Array<AutoCT>,
  setValues: Dispatch<AutoCT[]>,
  guildInfo: guildInfoT
}

const AutochannelDrawer = ({props, Control, Values, setValues, guildInfo} : AutochannelDrawerT) => {

  const {isOpen, onClose} = Control
  const [newProps, setNewProps] = useState(props)

  useEffect(() => {
    setNewProps(props)
  }, [props])

  const onDelete = () => {
    if(props.id !== -1){
      var newp = Values.filter((v : AutoCT) => {
        return v.id !== newProps.id
      })
      setValues(newp)
    }
  }

  const onSave = () => {
    var newp = Values
    if(props.id !== -1)
    {
      newp = newp.map((v : AutoCT) => 
        v.id === props.id
        ? newProps
        : v
      )
    }
    else {
      newp = [...newp, newProps]
    }
    setValues(newp)
  }

  if(newProps.origen !== "0" && newProps.target !== "0" && newProps.id === -1 && props.id === -1){
    setNewProps({...newProps, id: -2})
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
            Autochannel
          </DrawerHeader>

          <DrawerBody>

          <Box textAlign="center"><Heading as="h2" size="md">Origen</Heading></Box>
            <Select my={5} defaultValue={props.origen}
            onChange={(e) => {setNewProps({...newProps, origen: e.target.value})}}>
              <OptionChannel props={guildInfo.voices}/>
          </Select>

          <Box textAlign="center"><Heading as="h2" size="md">Canal a mostrar</Heading></Box>
            <Select my={5} defaultValue={props.target}
            onChange={(e) => {setNewProps({...newProps, target: e.target.value})}}>
              <OptionChannel props={guildInfo.channels}/>
          </Select>



          </DrawerBody>

          <DrawerFooter>
            <Button mr={5} onClick={onClose}>Cerrar</Button>

          {props.id !== -1 &&
            <Button mr={2} colorScheme="red" variant="outline"
            onClick={() => {onDelete(); onClose()}}>Eliminar</Button>
          }

          {
            newProps.id !== -1 &&
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

export default AutochannelDrawer;