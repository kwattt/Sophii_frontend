import { useEffect, useState } from 'react';
import axios from 'axios';

const base_url = "http://127.0.0.1:5001"

const FetchExtra = (selGuild, point) => {  
  const [data, setData] = useState("loading")

  useEffect(() => {
    let _mounted = true

    const fetchData = async() => {
      axios.get(base_url + point,
        { 
            params: {
              guild: selGuild
            }
        }
      ) 
      .then((response) => {
        if(_mounted)
          setData(response.data)
      })
      .catch((error) => {
        console.log(error)
        if(_mounted)
          setData("error")
      })
    }
    fetchData()

    return () => {
      _mounted = false
    }

  }, [selGuild, point])

  return data
}

export default FetchExtra