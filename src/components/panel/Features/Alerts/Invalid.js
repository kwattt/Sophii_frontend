import {Box, ScaleFade, Alert, Icon } from "@chakra-ui/react"

import { IoIosWarning } from "react-icons/io";

const Invalid = ({status}) => {
  return (<>
    <ScaleFade initialScale={0.8} in={status}>
      <Box height={30}>
      <Alert status="warning">
        <Icon as={IoIosWarning} w={8} h={8} color="yellow.300" mr={5}/>
        {"Un valor no es válido :("}
      </Alert>
      </Box>
    </ScaleFade>
  </>
  )
}

export default Invalid