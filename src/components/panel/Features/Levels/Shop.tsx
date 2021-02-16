import { Dispatch, useState } from 'react'
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
import { ShopT } from './Levels.d';

type StoreT = {
  props: guildInfoT,
  data: Array<ShopT>
}

const Store = ({props, data} : StoreT) => {
  const [vals, setVals] = useState(data)
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [sel, setSel] = useState<ShopT | undefined>(undefined)

  const [vald] = useDebounce(vals, 1000)

  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateLevels", "shop")

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
          <StoreItems items={vals} onOpen={onOpen} setSel={setSel}/>
        </Stack>
        
      </Scrollbars>

      {
        (vals.length >= 6)
      ?
        <Center>Solo puedes tener 6 items.</Center>
      :
      <Center>
        <Button 
          borderRadius={0} 
          colorScheme="yellow" 
          size="sm" 
          variant="outline"
          onClick={() => {
            setSel({
              name: "",
              type: -1,
              channel: "0",
              price: 0,
              role: "0",
            });
            onOpen();
          }}
        >
          Añadir item
        </Button>
      </Center>
      }

      <Center><Control status={updateStatus}/></Center>
    </Box>
    
    {typeof sel !== "undefined" &&
      <ShopDrawer Control={{isOpen, onClose}} guildInfo={props} props={sel} Values={vals} setValues={setVals} />
    }
  </>
  )
}

const lineBox = "solid #323136 1px"

type StoreItemsT = {
  items: Array<ShopT>,
  onOpen: () => void,
  setSel: Dispatch<ShopT>
}

const StoreItems = ({items, onOpen, setSel} : StoreItemsT) => {  

  const setInfo = (val: ShopT) => {
    setSel(val)
    onOpen()
  }

  return (<>
    {items.map((val: ShopT, id : number) => {
      return <Button 
              key={id} 
              colorScheme="green" 
              size="sm" 
              borderRadius={0}
              onClick={() => {setInfo(val)}}
            >
              {val.name}
            </Button>
    })}
  </>)

}

export default Store;