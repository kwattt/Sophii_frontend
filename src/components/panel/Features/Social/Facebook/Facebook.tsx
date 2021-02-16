import { Dispatch, useState } from 'react'
import { useDebounce } from 'use-debounce'
import Scrollbars from 'react-custom-scrollbars-2';

import { 
  useDisclosure,
  Box,
  Button, 
  Heading, 
  Stack,
  Center
} from "@chakra-ui/react"

import UpdatePoint from './../../updatePoint'
import SocialModal from './FacebookDrawer'

import Control from './../../Alerts/Control'
import { guildInfoT } from '../../../Panel.d';
import { FacebookT } from './Facebook.d';

type FBT = {
  props: guildInfoT,
  data: Array<FacebookT>
}

const Facebook = ({props, data} : FBT) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)

  const [sel, setSel] = useState<FacebookT | undefined>(undefined)

  const {isOpen, onOpen, onClose} = useDisclosure()
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateSocial", "facebook")

  return (<>
    <Box 
    borderLeft={lineBox}>
      <Box textAlign="center"><Heading as="h4" size="md">Facebook</Heading>

        <Heading paddingTop="10px" as="h6" size="xs">Páginas activas</Heading>
      </Box>

      <Box
        borderLeft={"solid white 2px"}
      >

        <Scrollbars
            style={{
              marginTop: "15px",
              height: "192px",
              textAlign: "justify",
            }}
          >

            <Stack spacing="0px" marginRight="0.4vw" paddingX="1vw">
              <FbButtons setSel={setSel} props={vals} onOpen={onOpen}/>
            </Stack>

          </Scrollbars>

      </Box>
      { vals.length >= 5 && props.tipo !== 2 ?
        "Solo puedes tener 5 páginas activos!"
      : 
        <Box textAlign="center">
          <Button 
            marginTop="5px" 
            marginLeft="1vw" 
            borderRadius="sm" 
            colorScheme="green" 
            size="sm" 
            variant="outline"
            onClick={() => {
              setSel({
                id: -1,
                name: "Nueva página",
                channel: "0",
                type: -1
              });
              onOpen()
            }}
          >
            Añadir página
          </Button>
        </Box>
}

      <Center><Control status={updateStatus}/></Center>

    </Box>
    {typeof sel !== "undefined" &&
      <SocialModal Control={{isOpen, onClose}} guildInfo={props} props={sel} Values={vals} setValues={setVals} />
    }

  </>)
}

const lineBox = "solid #323136 1px"

type FbButtonsT = {
  props: Array<FacebookT>,
  onOpen: () => void,
  setSel: Dispatch<FacebookT>
} 

const FbButtons = ({props, onOpen, setSel}: FbButtonsT) => {
  const setInfo = (val : FacebookT) => {
    setSel(val)
    onOpen()
  }
  
  return (
    <>
      {
        props.map((val : FacebookT, id : number) => {
        return <Button key={id} onClick={() => {setInfo(val)}} value={val.name} borderRadius="sm" colorScheme="orange" variant="outline" size="sm" >{val.name}</Button>
      })
      }
    </>
  )
}

export default Facebook;