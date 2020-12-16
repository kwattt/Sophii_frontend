import { useEffect, useState } from 'react';
import axios from 'axios';

const IsAuthorized = () => {  
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    const fetchData = async() => {

      axios.get("http://127.0.0.1:5000/api/authorized")
      .then((response) => {
        if(response.data.Auth)
          setAuth(true)
        else{
          setAuth(false)
          window.location.href = "/api/login"
        } 
      })
      .catch((error) => {
        setAuth(false)
      })
    }
    fetchData()
  }, [])

  console.log(auth)
  return auth
}

export default IsAuthorized