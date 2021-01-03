import {Box, ScaleFade, Icon, DarkMode } from "@chakra-ui/react"
import { IoMdCloudDone } from "react-icons/io";

const Valid = ({status}) => {
  return (<>
    <ScaleFade initialScale={0.8} in={status}>
      <Box height={30}>
        <DarkMode>
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
        </DarkMode>
      </Box>
    </ScaleFade>
  </>
  )
}

export default Valid