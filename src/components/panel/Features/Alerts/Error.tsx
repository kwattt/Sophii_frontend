import {Box, ScaleFade, Alert, Icon } from "@chakra-ui/react"
import { MdError } from "react-icons/md";
import statusT from './Alerts.d'

const Error = ({status} : statusT) => {
  return (<>
    <ScaleFade initialScale={0.8} in={status}>
      <Box height={30}>
      <Alert status="error">
        <Icon as={MdError} w={8} h={8} color="red.500" mr={5}/>
        Error al actualizar
      </Alert>
      </Box>
    </ScaleFade>
  </>
  )
}

export default Error