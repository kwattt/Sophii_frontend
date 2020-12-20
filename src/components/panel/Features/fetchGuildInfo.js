import { useEffect, useState } from 'react';
import axios from 'axios';

const FetchGuildInfo = (gid) => {  
  const [data, setData] = useState({roles: [], channels: []})

  useEffect(() => {

    const fetchData = async() => {
      console.log("fetched", gid)
      axios.get("http://127.0.0.1:5001/api/get_guild_info",
      {
          params: {
            guild: gid
          }
      })
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }

    if(gid !== 0 && gid !== undefined){
      fetchData()
    }

  }, [gid])

  return data
}

export default FetchGuildInfo