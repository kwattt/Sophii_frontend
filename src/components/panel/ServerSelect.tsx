import FetchGuilds from './Features/fetchGuilds'
import axios from 'axios'

import {
  Box,
  Select,
  Spinner
} from '@chakra-ui/react'

import { guildData, guildInfoT } from './Panel.d'
import { Dispatch } from 'react'
const base_url = process.env.REACT_APP_BASE_URL

type serverSelectT = {
  setSel: Dispatch<guildInfoT>,
  setTabIndex: Dispatch<number>
}

const ServerSelect = ({setSel, setTabIndex} : serverSelectT) => {
  const guilds = FetchGuilds()

  const changeGuild = (guild : string) =>{
    const fetchData = async() => {
      axios.get(base_url + "/api/getGuildInfo",
      {
          params: {
            guild: guild
          }
      })
      .then((response) => {
        setTabIndex(0)

        setSel({
          guild: guild,
          roles: response.data.roles,
          channels: response.data.channels,
          voices: response.data.voices,
          stalk: response.data.stalk,
          bday: response.data.bday, 
          bdaymsg: response.data.bdaymsg, 
          bdayutc: response.data.bdayutc,
          welcome: response.data.welcome,
          tipo: response.data.tipo,
          stats: response.data.stats
        })
      })
      .catch((error) => {
        console.log(error)
      })
    }

    if(guild !== "0" && guild !== undefined){
      fetchData()
    }
  }

  return (
    <>
      {guilds !== undefined ?
      <Box>
          <Select 
            border="solid white 1px"
            onChange={(e)=>{changeGuild(e.target.value)}}
            size="sm"
            defaultValue="0"
            >
            <option value="0" disabled>Servidor</option>
            <Options props={guilds}/>    
          </Select>
      </Box>      
      :<>
        <Spinner/>
      </>}
    </>
  )
}

type optionT = {
  props: Array<guildData>
}

const Options = ({props} : optionT ) => {
  return (<>
    {props.map((val : guildData, id: number) => {
      return <option value={val.id} key={id}>{val.name}</option>
    })
    }
    </>
  )
} 

export default ServerSelect