import { Dispatch, useState } from 'react'
import { useDebounce } from 'use-debounce'
import Scrollbars from 'react-custom-scrollbars-2'
import Control from '../../Alerts/Control'

import { 
  Box, 
  Heading,
  Button,
  Stack,
  useDisclosure
} from '@chakra-ui/react';

import { channelInfoT, guildInfoT } from '../../../Panel.d'

import {AutoCT} from './../Extra2.d'
import AutochannelDrawer from './AutochannelDrawer';
import UpdatePoint from '../../updatePoint';

const lineBox = "solid #323136 1px"

type AutochannelT = {
  props : guildInfoT 
  data: AutoCT[]
}

const Autochannel = ({props, data} : AutochannelT) => {
  const [vals, setVals] = useState<AutoCT[]>(data)
  const [vald] = useDebounce(vals, 1000)
  const [sel, setSel] = useState<AutoCT | undefined>(undefined)
  const {isOpen, onOpen, onClose} = useDisclosure()
  const updateStatus = UpdatePoint(props.guild, vald, data, "/api/updateAutochannel")

  return (
    <Box
      borderLeft={lineBox}
    >

      <Box textAlign="center">
        <Heading as="h4" size="md">AutoChannel</Heading>
        <Heading py="10px" as="h6" size="xs">Activos</Heading>
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
          <AutoButtons channels={props.voices} onOpen={onOpen} props={vals} setSel={setSel}/>
        </Stack>

      </Scrollbars>

      <Box textAlign="center">
        {vals.length >= 6 ?
          "Solo puedes tener 6 auto channels!"
        :
        <Button 
          marginTop="5px" 
          borderRadius="sm" 
          colorScheme="blue" 
          size="sm" 
          variant="outline"
          onClick={() => {
            onOpen()
            setSel({
              id: -1,
              origen: "0",
              target: "0"
            })
          }}
        >
          Añadir
        </Button>
      }
      </Box>

      <Box textAlign="center"><Control status={updateStatus}/></Box>

      {typeof sel !== "undefined" &&
        <AutochannelDrawer guildInfo={props} props={sel} Control={{isOpen, onClose}} Values={vals} setValues={setVals}/>    
      }

    </Box>
  )
}

type AutoButtonsT = {
  props: Array<AutoCT>,
  onOpen: () =>  void,
  setSel: Dispatch<AutoCT>,
  channels: Array<channelInfoT>
}

const AutoButtons = ({props, onOpen, setSel, channels} : AutoButtonsT) => {
  const setInfo = (val : any) => {
    setSel(val)
    onOpen()
  }

  const getChannelName = (id: string) : string => {
    const res = channels.filter((v : channelInfoT) => {return v.id === id})
    if(res.length > 0 )
      return res[0].name
    else return "Canal inexistente"
    }

  return (
    <>
      {
        props.map((val: any, id : number) => {
        return <Button 
          key={id} 
          onClick={() => {setInfo(val)}} 
          value={val.id} 
          borderRadius="sm" 
          colorScheme="orange" 
          variant="outline" 
          size="sm" >{getChannelName(val.origen)}</Button>
      })
      }
    </>
  )
}

export default Autochannel;