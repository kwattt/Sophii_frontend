import { useEffect, useState } from 'react';
import axios from 'axios';

const base_url = process.env.REACT_APP_BASE_URL

const IsAuthorized = () => {  
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    const fetchData = async() => {

      axios.get(base_url + "/api/authorized") // Bueno, al trabajar en diferentes puertos por mi madre que voy a llamar esto. Production should be /api/authorized
      .then((response) => {
        if(response.data.Auth)
          setAuth(true)
        else{
          setAuth(false)
          window.location.href = "/api/login"
        } 
      })
      .catch((error) => {
        console.log("Error al autorizar :(")
        setAuth(false)
      })
    }
    fetchData()
  }, [])

  return auth
}

export default IsAuthorized