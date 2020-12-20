import { useEffect, useState } from 'react';
import axios from 'axios';

const IsAuthorized = () => {  
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    const fetchData = async() => {

      axios.get("http://127.0.0.1:5001/api/authorized") // Bueno, al trabajar en diferentes puertos por mi madre que voy a llamar esto. Production should be /api/authorized
      .then((response) => {
        if(response.data.Auth)
          setAuth(true)
        else{
          setAuth(false)
          window.location.href = "/api/login"
        } 
      })
      .catch((error) => {
        console.log("THEFUCK?")
        setAuth(false)
      })
    }
    fetchData()
  }, [])

  return auth
}

export default IsAuthorized