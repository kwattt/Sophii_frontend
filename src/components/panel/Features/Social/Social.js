import Loading from './../Loading'
import Error from './../Error'

import FetchSocial from './fetchSocial'

import Twitch from './Twitch'

const Purge = ({props}) => {
  const data = FetchSocial(props.guild)
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