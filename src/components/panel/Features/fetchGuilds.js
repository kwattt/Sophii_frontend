import { useEffect, useState } from 'react';
import axios from 'axios';

const FetchGuilds = () => {  
  const [data, setData] = useState([])
  
  useEffect(() => {
    const fetchData = async() => {
      axios.get("http://127.0.0.1:5001/api/get_guilds") // Bueno, al trabajar en diferentes puertos por mi madre que voy a llamar esto. Production should be /api/streams
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
        setData([])
      })
    }
    fetchData()
  }, [])

  return data
}

export default FetchGuilds