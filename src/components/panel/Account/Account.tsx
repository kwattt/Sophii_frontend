import { useState } from 'react'
import AccountModal from './AccountModal'
import { useDisclosure, Button } from '@chakra-ui/react'
import {BiWrench} from 'react-icons/bi'
import axios from 'axios'
import {accI} from './Account.d'

const base_url = process.env.REACT_APP_BASE_URL

const Account = () => {
  const [data, setData] = useState<accI | undefined>(undefined)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = () => {
    const fetchData = async() => {
      axios.get(base_url + "/api/account",
      ) 
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
      {data !== undefined &&
        <>
          <AccountModal data={data} Control={{isOpen, onClose}}/>
        </>
      }
  </>)
}

export default Account;