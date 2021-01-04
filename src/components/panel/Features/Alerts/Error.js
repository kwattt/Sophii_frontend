import {Box, ScaleFade, Alert, Icon, DarkMode } from "@chakra-ui/react"

import { MdError } from "react-icons/md";

const Error = ({status}) => {
  return (<>
    <ScaleFade initialScale={0.8} in={status}>
      <Box height={30}>
        <DarkMode>
      <Alert status="error">
        <Icon as={MdError} w={8} h={8} color="red.500" mr={5}/>
        Error al actualizar
      </Alert>
        </DarkMode>
      </Box>
    </ScaleFade>
  </>
  )
}

export default Error