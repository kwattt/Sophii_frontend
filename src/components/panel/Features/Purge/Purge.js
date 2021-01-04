import Loading from './../Loading'
import Error from './../Error'

import FetchPoint from './../fetchPoint'

import PurgeList from './PurgeList'

const Purge = ({props}) => {
  const data = FetchPoint(props.guild, "/api/purge")
  return (<>
    {data === "loading" && <Loading/>}

    {data === "error" ? <Error/>
    :
      <>
      {data !== undefined && data !== "loading" &&
        
        <>

          <PurgeList props={props} data={data}/>

        </>
      }
      </>
    }


  </>)
}

export default Purge