import axios from 'axios'
import { useEffect, useState } from 'react'

const base_url = process.env.REACT_APP_BASE_URL

const UpdatePoint = (guild : string, props : any, ogprops : any, point : string, key?: string) : string  => {
  const [data, setData] = useState<string>("load")

  useEffect(() => {
    let _mounted = true

    const sendData = async () => {
      var nData = props
      if  (key) {
        nData = {
          [key]: props 
        }
      }

      setData("loading")
      axios.post(base_url + point,
      {
        guild: guild,
        data: nData
      }).then(() => {
        
        if(_mounted)
          {
            setData("valid")
            setTimeout(() => {
              if(_mounted)
                setData("load")
            }, 2000);

          }
        }).catch(error => {

        if(_mounted){
          if (error.response) {
            if(error.response.status !== 400){
              setData("error")
            }
            else{
              setData("invalid")

            } 
          } else {
            setData("error")
          }
      }
      })
    }

    if (props !== undefined && props !== ogprops)
      sendData()

    return () => {
      _mounted = false
    }
  }, [guild, props, ogprops, point, key])
  
  return data
}

export default UpdatePoint;