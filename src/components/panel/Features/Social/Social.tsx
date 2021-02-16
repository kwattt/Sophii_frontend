import Loading from './../Loading'
import Error from './../Error'

import FetchPoint from './../fetchPoint'

import Twitch from './Twitch/Twitch'
import Facebook from './Facebook/Facebook'
import Twitter from './Twitter/Twitter'
import Youtube from './Youtube/Youtube'

import {propBType} from './../../Panel.d'
import { SocialT } from './Social.d'

const Social = ({props} : propBType) => {
  const data : SocialT | string = FetchPoint(props.guild, "/api/social")
  return (<>
    {data === "loading" && <Loading/>}

    {data === "error" ? <Error/>
    :
      <>
      {data !== "loading" &&
      typeof data !== "string" && 
        <>
          <Twitch props={props} data={data.twitch}/>
          <Facebook props={props} data={data.facebook}/>
          <Twitter props={props} data={data.twitter}/>
          <Youtube props={props} data={data.youtube}/>
        </>
      }
      </>
    }

  </>)
}

export default Social;