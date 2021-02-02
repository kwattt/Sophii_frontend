import Loading from './../Loading'
import Error from './../Error'

import FetchPoint from './../fetchPoint'

import Twitch from './Twitch'
import Facebook from './Facebook'
import Twitter from './Twitter'
import Youtube from './Youtube'

const Purge = ({props}) => {
  const data = FetchPoint(props.guild, "/api/social")
  return (<>
    {data === "loading" && <Loading/>}

    {data === "error" ? <Error/>
    :
      <>
      {data !== undefined && data !== "loading" &&
        <>
          <Twitch props={props} data={{"twitch": data.twitch}}/>
          <Facebook props={props} data={{"facebook": data.facebook}}/>
          <Twitter props={props} data={{"twitter": data.twitter}}/>
          <Youtube props={props} data={{"youtube": data.youtube}}/>
        </>
      }
      </>
    }

  </>)
}

export default Purge