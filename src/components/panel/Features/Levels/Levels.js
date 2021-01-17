import Loading from './../Loading'
import Error from './../Error'

import FetchPoint from './../fetchPoint'

import LevelToggle from './LevelToggle'

const Purge = ({props}) => {
  const data = FetchPoint(props.guild, "/api/levels")
  return (<>
    {data === "loading" && <Loading/>}

    {data === "error" ? <Error/>
    :
      <>
      {data !== undefined && data !== "loading" &&
        
        <>

          <LevelToggle props={props} data={data}/>

        </>
      }
      </>
    }
  </>)
}

export default Purge