import {Box, ScaleFade, Spinner } from "@chakra-ui/react"
import statusT from './Alerts.d'

const Valid = ({status} : statusT) => {
  return (<>
    <ScaleFade initialScale={0.8} in={status}>
      <Box height={30}>
          <Spinner 
            w={8} 
            h={8} 
            color="purple.500" 
          />
      </Box>
    </ScaleFade>
  </>
  )
}

export default Valid