
import Valid from './Valid'
import Error from './Error'
import Load from './Load'

const ControlAlert = ({status}) => {
  return (<>

    {status === "loading" &&
      <Load status={true}/>
    }

    {status === "valid" ? 
      <Valid status={true}/>
      :
      <Valid status={false}/>
    }

    {status === "error" &&
      <Error status={true}/>
    }

  </>)
} 

export default ControlAlert