import { useEffect, useState } from 'react';
import axios from 'axios';

const FetchSocial = (selGuild) => {  
  const [data, setData] = useState([])
  
  useEffect(() => {
    const fetchData = async() => {
      axios.get("http://127.0.0.1:5001/api/streams",
        {
            params: {
              guild: selGuild
            }
        }
      ) // Bueno, al trabajar en diferentes puertos por mi madre que voy a llamar esto. Production should be /api/streams
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
        setData([])
      })
    }
    fetchData()
  }, [selGuild])

  return data
}

export default FetchSocial