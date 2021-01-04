import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import CustomScroller from 'react-custom-scroller';

import { 
  useDisclosure,
  Box,
  Button, 
  DarkMode, 
  Heading, 
  Stack
} from "@chakra-ui/react"

import UpdatePoint from './../updatePoint'
import PurgeModal from './PurgeModal'

import Control from './../Alerts/Control'

const Purge = ({props, data}) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)

  const [sel, setSel] = useState({})

  const {isOpen, onOpen, onClose} = useDisclosure()
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updatePurge")

  return (<>
    <Box
    borderLeft={lineBox}>

      <center><Heading as="h4" size="md">Limpieza</Heading>

      <Heading py="10px" as="h6" size="xs">Canales</Heading>

      </center>

      <CustomScroller
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
        </CustomScroller>
    
        <center><Control status={updateStatus}/></center>

    </Box>
    <PurgeModal props={sel} Control={{isOpen, onClose}} Values={vals} setValues={setVals}/>

  </>)
}

const lineBox = "solid #323136 1px"

const ButtonChannels = ({props, vals, setSel, onOpen}) => {
  const selected = vals.map((v) => {return v.channel})

  const handleClick = (val) => {

    const res = vals.find((c) => {return c.channel === val.id})
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
      <DarkMode>
      {props.map((val) => {
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
      </DarkMode>
    </>
  )
}

export default Purge