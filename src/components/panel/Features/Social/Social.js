import Loading from './../Loading'
import Error from './../Error'

import FetchPoint from './../fetchPoint'

import Twitch from './Twitch'

const Purge = ({props}) => {
  const data = FetchPoint(props.guild, "/api/streams")
  return (<>
    {data === "loading" && <Loading/>}

    {data === "error" ? <Error/>
    :
      <>
      {data !== undefined && data !== "loading" &&
        
        <>

          <Twitch props={props} data={{"twitch": data.twitch}}/>
        </>
      }
      </>
    }


  </>)
}

export default Purge