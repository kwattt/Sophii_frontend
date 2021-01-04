import { 
  Box,
  Skeleton,
  SkeletonText,
  Stack
} from "@chakra-ui/react"

const Loading = () => {

  return (<>
    <Box>

      <center>
      <Skeleton h={6} mx={7}/>
      </center>
      
      <br/>
      <Stack>
        <Skeleton h={4}/>
        <SkeletonText noOfLines={4} mx={7}/>
      </Stack>

    </Box>
    
    <Box>
    <center>
      <Skeleton h={6} mx={7}/>
      </center>
      
      <br/>
      <Stack>
        <Skeleton h={12} startColor="gray.600" endColor="green.600"/>
        <SkeletonText noOfLines={6}/>
      </Stack>      
    </Box>
    
    <Box>
    <center>
      <Skeleton h={6} mx={7}/>
      </center>
      
      <br/>

      <Stack>
        <center><Skeleton h={2} mx={9}/>
        <Skeleton h={20} my={3} mx={5} startColor="gray.600" endColor="purple.600"/>
        <SkeletonText noOfLines={3}/>
        </center>

      </Stack> 
    </Box>
    
    <Box>
      <center>¿Un café mientras esperamos? ☕</center>
    </Box>
    
    <Box>
    </Box>
  </>)
}

export default Loading