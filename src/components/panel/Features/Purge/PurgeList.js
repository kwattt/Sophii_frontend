import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import CustomScroller from 'react-custom-scroller';

import { 
  Box,
  Button, 
  DarkMode, 
  Stack
} from "@chakra-ui/react"

import UpdatePurge from './updatePurge'

const Purge = ({props, data}) => {
  const [vals, setVals] = useState(data)
  const [vald] = useDebounce(vals, 1000)
  const updateStatus = UpdatePurge(props.guild, vald, data)
  const channels = data.map((v) => {return v.channel} )

  return (<>
    <Box
    borderLeft={lineBox}>
      <CustomScroller
          style={{
            marginTop: "15px",
            marginBottom: "15px",
            height: "284px",
            textAlign: "justify",
            borderLeft: "solid white 2px"
          }}
        >
          <Stack spacing={1}>
            <ButtonChannels props={props.channels} selected={channels}/>
          </Stack>
        </CustomScroller>
    </Box>
  </>)
}

const lineBox = "solid #323136 1px"

const ButtonChannels = ({props, selected}) => {
  return (
    <>
      <DarkMode>
      {props.map((val) => {
        return <Button 
          size="sm"
          borderRadius="50"
          colorScheme={selected.includes(val.id) ? "pink" : "gray"}
          key={val.id} 
          value={val.id}>
            {val.name}
          </Button>
      })
      }
      </DarkMode>
    </>
  )
}

export default Purge