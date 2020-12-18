import {
  Box,
  Select
} from '@chakra-ui/react'

const ServerSelect = ({setSel}) => {

  return (
    <>
      <Box
        paddingX="1vw"
        paddingTop="5px">
      <Select 
        onChange={(e)=>{setSel(e.target.value)}}
        size="sm"
        defaultValue="0"
        >
        <option value="0" disabled>Servidor</option>
        <option value="1">uh.</option>
        <option value="2">Bre!</option>
      </Select>

      </Box>
    </>
  )

}

// Falta un hook para hacer fetch a los servidores. 

export default ServerSelect