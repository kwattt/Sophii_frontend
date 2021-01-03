import Loading from './../Loading'
import Error from './../Error'

import FetchPurge from './fetchPurge'

import PurgeList from './PurgeList'

const Extra = ({props}) => {
  const data = FetchPurge(props.guild)
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

export default Extra