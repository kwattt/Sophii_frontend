import { useEffect, useState } from 'react';
import axios from 'axios';

const base_url = process.env.REACT_APP_BASE_URL

const FetchExtra = (selGuild : string, point : string) : any => {  
  const [data, setData] = useState<any>("loading")

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