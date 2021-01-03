
import Valid from './Valid'
import Error from './Error'
import Load from './Load'
import Invalid from './Invalid'

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

    {status === "invalid" &&
      <Invalid status={true}/>
    }

  </>)
} 

export default ControlAlert