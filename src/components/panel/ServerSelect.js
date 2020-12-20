import FetchGuilds from './Features/fetchGuilds'
import FetchGuildInfo from './Features/fetchGuildInfo'

import axios from 'axios'

import {
  Box,
  Select
} from '@chakra-ui/react'

const ServerSelect = ({sel, setSel}) => {
  const guilds = FetchGuilds()
  const Info = FetchGuildInfo(sel.guild)

  const changeGuild = (guild) =>{

    const fetchData = async() => {
      console.log("fetched", guild)
      axios.get("http://127.0.0.1:5001/api/get_guild_info",
      {
          params: {
            guild: guild
          }
      }) // Bueno, al trabajar en diferentes puertos por mi madre que voy a llamar esto. Production should be /api/get_guild_info
      .then((response) => {
        setSel({
          guild: guild,
          roles: response.data.roles,
          channels: response.data.channels
        })
      })
      .catch((error) => {
        console.log(error)
      })
    }

    if(guild !== 0 && guild !== undefined){
      fetchData()
    }
  }

  return (
    <>
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
    </>
  )

}

const Options = ({props}) => {
  return (<>
    {props.map((val, id) => {
      return <option value={val.id} key={id}>{val.name}</option>
    })
    }
    </>
  )
} 

export default ServerSelect