import { useState } from 'react'
import { useDebounce } from 'use-debounce'

import CustomScroller from 'react-custom-scroller';

import { 
  Box,
  Heading,
  Button,
  Stack,
  useDisclosure
} from '@chakra-ui/react'

import UpdatePoint from '../updatePoint'
import Control from '../Alerts/Control'

import ShopDrawer from './ShopDrawer'

const Store = ({props, data}) => {
  const [vals, setVals] = useState(data)
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [sel, setSel] = useState({})

  const [vald] = useDebounce(vals, 1000)

  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateLevels")

  return (<>
  
  <Box
    borderLeft={lineBox}>
  
      <center><Heading as="h4" size="md">Tienda</Heading>

      <Heading py="10px" as="h6" size="xs">Items</Heading></center>

      <CustomScroller
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
        
      </CustomScroller>

      <center><Heading py="10px" as="h6" size="xs">Agregar nuevo item</Heading>

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
        </Button></center>

      <center><Control status={updateStatus}/></center>
    </Box>

    <ShopDrawer Control={{isOpen, onClose}} guildInfo={props} props={sel} Values={vals.shop} setValues={setVals} />

  </>

  )

}
const lineBox = "solid #323136 1px"

const StoreItems = ({items, onOpen, setSel}) => {  

  const setInfo = (val) => {
    setSel(val)
    onOpen()
  }

  return (
    items.map((val, id) => {
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