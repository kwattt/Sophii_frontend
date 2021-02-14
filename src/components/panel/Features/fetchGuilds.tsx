import { useEffect, useState } from 'react';
import axios from 'axios';

const base_url = process.env.REACT_APP_BASE_URL

const FetchGuilds = () : any => {  
  const [data, setData] = useState<Array<String> | undefined >(undefined)
  
  useEffect(() => {
    const fetchData = async() => {
      axios.get(base_url + "/api/getGuilds")
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

export default FetchGuilds;