import {useEffect, useState} from 'react'
import AccountModal from './AccountModal'
import { useDisclosure, Button } from '@chakra-ui/react'
import {BiWrench} from 'react-icons/bi'

import axios from 'axios'

const Account = () => {
  const [data, setData] = useState(undefined)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = () => {
    const fetchData = async() => {
      axios.get("http://127.0.0.1:5001/api/account",
      ) // Bueno, al trabajar en diferentes puertos por mi madre que voy a llamar esto. Production should be /api/streams
      .then((response) => {
        setData(response.data)
        onOpen()
      })
      .catch((error) => {
        setData(undefined)
      })
    }
    fetchData()    

  }

  return (<>
      <Button onClick={handleClick} borderRadius={0} size="sm" marginRight="10px" leftIcon={<BiWrench />} colorScheme="teal" variant="outline">
        Cuenta
      </Button>
      {data !== undefined && data !== "loading" &&
        <>
          <AccountModal data={data} Control={{isOpen, onClose}}/>
        </>
      }
  </>)
}

export default Account
