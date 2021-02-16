import Loading from './../Loading'
import Error from './../Error'

import FetchPoint from './../fetchPoint'

import MsgChannel from './MsgChannel'
import Oraculo from './Oraculo'
import Join from './Join'
import Leave from './Leave'

import {propBType} from './../../Panel.d'
import { MsgT } from './Msg.d'

const Extra = ({props} : propBType) => {
  const data : MsgT | string = FetchPoint(props.guild, "/api/msg")

  return (<>
    {data === "loading" && <Loading/>}

    {data === "error" ? <Error/>
    :
      <>
      {data !== "loading" &&
      typeof data !== "string" && 
        <>
          <MsgChannel props={props} data={data.channel} />
          <Join props={props} data={data.join}/>
          <Leave props={props} data={data.leave}/>
          <Oraculo props={props} data={data.oraculo}/>
        </>
      }
      </>
    }
  </>)
}

export default Extra