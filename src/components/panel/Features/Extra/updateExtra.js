import axios from 'axios'
import { useEffect, useState } from 'react'

const UpdateExtra = (guild, props, ogprops)  => {
  const [data, setData] = useState("load")

  useEffect(() => {
    let _mounted = true

    const sendData = async () => {
      setData("loading")
      axios.post("http://127.0.0.1:5001/api/updateExtra",
      {
        guild: guild,
        data: props
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
  }, [guild, props, ogprops])
  
  return data
}
export default UpdateExtra