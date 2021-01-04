import { useEffect, useState } from 'react';
import axios from 'axios';

const base_url = process.env.REACT_APP_BASE_URL

const FetchGuilds = () => {  
  const [data, setData] = useState([])
  
  useEffect(() => {
    const fetchData = async() => {
      axios.get(base_url + "/api/getGuilds") // Bueno, al trabajar en diferentes puertos por mi madre que voy a llamar esto. Production should be /api/endpoint
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