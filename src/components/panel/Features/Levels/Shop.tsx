import { useState } from 'react'
import { useDebounce } from 'use-debounce'

import { Scrollbars } from 'react-custom-scrollbars-2';

import { 
  Box,
  Heading,
  Button,
  Stack,
  useDisclosure,
  Center
} from '@chakra-ui/react'

import UpdatePoint from '../updatePoint'
import Control from '../Alerts/Control'

import ShopDrawer from './ShopDrawer'

import {guildInfoT} from './../../Panel.d'

type StoreT = {
  props: guildInfoT,
  data: any
}

const Store = ({props, data} : StoreT) => {
  const [vals, setVals] = useState(data)
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [sel, setSel] = useState({})

  const [vald] = useDebounce(vals, 1000)

  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateLevels")

  return (<>
  
  <Box
    borderLeft={lineBox}>
  
      <Box textAlign="center">
        <Heading as="h4" size="md">Tienda</Heading>
        <Heading py="10px" as="h6" size="xs">Items</Heading>
      </Box>

      <Scrollbars
        style={{
          marginTop: "15px",
          marginBottom: "15px",
          height: "214px",
          textAlign: "justify",
          borderLeft: "solid white 2px"
        }}
      >

        <Stack spacing="2px" marginRight="0.4vw" paddingX="1vw">
          <StoreItems items={vals.shop} onOpen={onOpen} setSel={setSel}/>
        </Stack>
        
      </Scrollbars>

      <Box textAlign="center"><Heading py="10px" as="h6" size="xs">Agregar nuevo item</Heading>

        <Button 
          borderRadius={0} 
          colorScheme="yellow" 
          size="sm" 
          variant="outline"
          onClick={() => {
            setSel({
              name: "",
              type: "-1",
              channel: 0,
              price: 0,
              role: 0,
            });
            onOpen();
          }}
        >
          Añadir item
        </Button>
      </Box>

      <Center><Control status={updateStatus}/></Center>
    </Box>

    <ShopDrawer Control={{isOpen, onClose}} guildInfo={props} props={sel} Values={vals.shop} setValues={setVals} />

  </>

  )

}
const lineBox = "solid #323136 1px"

type StoreItemsT = {
  items: any,
  onOpen: any,
  setSel: any
}

const StoreItems = ({items, onOpen, setSel} : StoreItemsT) => {  

  const setInfo = (val: any) => {
    setSel(val)
    onOpen()
  }

  return (
    items.map((val: any, id : number) => {
      return <Button 
              key={id} 
              colorScheme="green" 
              size="sm" 
              borderRadius={0}
              onClick={() => {setInfo(val)}}
            >
              {val.name}
            </Button>
    })
  )

}

export default Store