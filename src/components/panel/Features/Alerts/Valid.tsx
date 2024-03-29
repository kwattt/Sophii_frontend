import {Box, ScaleFade, Icon } from "@chakra-ui/react"
import { IoMdCloudDone } from "react-icons/io";
import statusT from './Alerts.d'

const Valid = ({status} : statusT) => {
  return (<>
    <ScaleFade initialScale={0.8} in={status}>
      <Box height={30}>
          <Icon 
            as={IoMdCloudDone} 
            w={8} 
            h={8} 
            color="green.500" 
            mr={5} 
            px={1}
            py={1}
            borderRadius={50} 
            backgroundColor="rgba(113, 173, 136, 0.21)"/>
      </Box>
    </ScaleFade>
  </>
  )
}

export default Valid