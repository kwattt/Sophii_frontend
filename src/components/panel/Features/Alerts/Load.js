import {Box, ScaleFade, Spinner, DarkMode } from "@chakra-ui/react"

const Valid = ({status}) => {
  return (<>
    <ScaleFade initialScale={0.8} in={status}>
      <Box height={30}>
        <DarkMode>
          <Spinner 
            w={8} 
            h={8} 
            color="purple.500" 
          />
        </DarkMode>
      </Box>
    </ScaleFade>
  </>
  )
}

export default Valid