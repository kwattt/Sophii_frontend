import { useState } from 'react'
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

import UpdatePoint from './../updatePoint'
import SocialModal from './TwitterDrawer'

import Control from './../Alerts/Control'
import { guildInfoT } from '../../Panel.d';

type TwitterT = {
  props: guildInfoT,
  data: any 
}

const Twitter = ({props, data} : TwitterT) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)

  const [sel, setSel] = useState({})

  const {isOpen, onOpen, onClose} = useDisclosure()
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateSocial")

  return (<>
    <Box 
    borderLeft={lineBox}>
      <Box textAlign="center">
        <Heading as="h4" size="md">Twitter</Heading>
        <Heading paddingTop="10px" as="h6" size="xs">Perfiles activas</Heading>
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
              <TwButtons setSel={setSel} props={vals.twitter} onOpen={onOpen}/>
            </Stack>

          </Scrollbars>

      </Box>
      { vals.twitter.length >= 5 && props.tipo !== 2 ?
        "Solo puedes tener 5 perfiles activos!"
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
                name: "Nuevo perfil",
                type: "-1",
                channel: 0
              });
              onOpen()
            }}
          >
            Añadir perfil
          </Button>
        </Box>
}

      <Center><Control status={updateStatus}/></Center>

    </Box>
    <SocialModal Control={{isOpen, onClose}} guildInfo={props} props={sel} Values={vals.twitter} setValues={setVals} />

  </>)
}

const lineBox = "solid #323136 1px"

type TwButtonsT = {
  props: any, 
  onOpen: () => void, 
  setSel: any
}

const TwButtons = ({props, onOpen, setSel} : TwButtonsT) => {
  
  const setInfo = (val : any) => {
    setSel(val)
    onOpen()
  }
  
  return (
    <>
      {
        props.map((val : any, id : number) => {
        return <Button key={id} onClick={() => {setInfo(val)}} value={val.name} borderRadius="sm" colorScheme="orange" variant="outline" size="sm" >{val.name}</Button>
      })
      }
    </>
  )
}

export default Twitter;