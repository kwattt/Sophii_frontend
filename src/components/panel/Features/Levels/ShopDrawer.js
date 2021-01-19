import {useState, useEffect} from 'react'

import {
  Button,
  Heading,
  Input,

  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,

  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputLeftAddon,
  Select,

} from "@chakra-ui/react"


const ShopDrawer = ({props, Control, Values, setValues, guildInfo}) => {
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
      setValues({...Values, shop: newp})
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
      newp = [...newp, newProps]
    }
    setValues({...Values, shop: newp})
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
            : "Nuevo item"}
          </DrawerHeader>

          <DrawerBody>
            <center><Heading as="h3" size="sm">Nombre</Heading></center>
        
            <Input 
              mt={2}
              defaultValue={props.name}
              size="sm"
              onChange={(e) => {setNewProps({...newProps, name: e.target.value})}}
            />

            <center><Heading as="h3" size="sm" mt={5}>Precio</Heading></center>

            <InputGroup 
              size="sm"
              mt={2}
            >
                <InputLeftAddon children="Monedas" />
                  <NumberInput 
                    defaultValue={props.price} 
                    onChange={(v) => {setNewProps({...newProps, price: v})}}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>              
                </InputGroup>

            <center><Heading as="h3" size="sm" mt={5}>Tipo</Heading></center>

            <Select
              mt={2}
              size="sm"
              defaultValue={props.type}
              onChange={(e) => {setNewProps({...newProps, type: e.target.value})}}
            >
              <option value="-1" disabled>Seleccionar</option>
              <option value="1">Rol (automático)</option>
              <option value="2">Otro (manual)</option>
            </Select>

            { newProps.type === "1" && <>

              <center><Heading as="h4" size="xs" my={2}>Rol</Heading></center>

              <Select
                size="sm"
                defaultValue={props.role}
                onChange={(e) => {setNewProps({...newProps, role: e.target.value})}}
              >
                <SelectRole props={guildInfo.roles}/>
              </Select>
              </>
            }

            <center><Heading as="h3" size="sm" mt={5}>Canal de alerta</Heading></center>

            <Select
                mt={2}
                size="sm"
                defaultValue={props.channel}
                onChange={(e) => {setNewProps({...newProps, channel: e.target.value})}}
              >
                <option value="0">Ninguno</option>
                <SelectChannel props={guildInfo.channels}/>
              </Select>

          </DrawerBody>

          <DrawerFooter>

            <Button mr={5} onClick={onClose}>Cerrar</Button>

              {props.name !== "" &&
                <Button mr={2} colorScheme="red" variant="outline"
                onClick={() => {onDelete(); onClose()}}>Eliminar</Button>
              }

              {
                (newProps.type !== "-1") &&
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


const SelectRole = ({props}) => {
  
  return (
    <>
      {props.map((val) => {
        return <option key={val.id} value={val.id}>{val.name}</option>
      })
      }
    </>
  )
}

const SelectChannel = ({props}) => {
  
  return (
    <>
      {props.map((val) => {
        return <option key={val.id} value={val.id}>{val.name}</option>
      })
      }
    </>
  )
}


export default ShopDrawer
