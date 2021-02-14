import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import Scrollbars from 'react-custom-scrollbars-2'

import { 
  useDisclosure,
  Box,
  Button, 
  Heading, 
  Stack
} from "@chakra-ui/react"

import UpdatePoint from './../updatePoint'
import PurgeDrawer from './PurgeDrawer'

import Control from './../Alerts/Control'
import { guildInfoT, channelInfoT } from '../../Panel.d'

type PurgeT = {
  props : guildInfoT 
  data: any 
}

const Purge = ({props, data} : PurgeT) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)

  const [sel, setSel] = useState({})

  const {isOpen, onOpen, onClose} = useDisclosure()
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updatePurge")

  return (<>
    <Box
    borderLeft={lineBox}>

      <Box textAlign="center"><Heading as="h4" size="md">Limpieza</Heading>

      <Heading py="10px" as="h6" size="xs">Canales</Heading>

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
          <Stack spacing={1}>
            <ButtonChannels onOpen={onOpen} props={props.channels} setSel={setSel} vals={vals}/>
          </Stack>
        </Scrollbars>
    
        <Box textAlign="center"><Control status={updateStatus}/></Box>

    </Box>
    <PurgeDrawer props={sel} Control={{isOpen, onClose}} Values={vals} setValues={setVals}/>

  </>)
}

const lineBox = "solid #323136 1px"

type ButtonChannelsT = {
  props: Array<channelInfoT>,
  vals: any,
  setSel: any, 
  onOpen: () => void
}

const ButtonChannels = ({props, vals, setSel, onOpen} : ButtonChannelsT) => {

  const selected = vals.map((v : any) => {return v.channel})

  const handleClick = (val : channelInfoT) => {

    const res = vals.find((c : any) => {return c.channel === val.id})
    if(res){
      setSel({...res, active: 1, name: val.name})
    }
    else {
      if(selected.length >= 3){
        alert("Solo puedes tener 3 limpiezas activas!")
        return
      }

      setSel({channel: val.id, name: val.name, minute: 0, utc: 0, hour: 0, active: 0})
    }
    onOpen()
  }

  return (
    <>
      {props.map((val : channelInfoT) => {
        return <Button 
          size="sm"
          borderRadius="50"
          colorScheme={selected.includes(val.id) ? "pink" : "gray"}
          key={val.id} 
          value={val.id}
          onClick={() => {handleClick(val)}}
          >
            {val.name}
          </Button>
      })
      }
    </>
  )
}

export default Purge