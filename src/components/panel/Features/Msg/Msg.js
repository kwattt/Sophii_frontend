import Loading from './../Loading'
import Error from './../Error'

import FetchPoint from './../fetchPoint'

import MsgChannel from './MsgChannel'
import Oraculo from './Oraculo'
import Join from './Join'
import Leave from './Leave'

const Extra = ({props}) => {
  const data = FetchPoint(props.guild, "/api/msg")

  return (<>
    {data === "loading" && <Loading/>}

    {data === "error" ? <Error/>
    :
      <>
      {data !== undefined && data !== "loading" &&
        <>
          <MsgChannel props={props} data={{channel: data.channel}} />
          <Join props={props} data={{join: data.join}}/>
          <Leave props={props} data={{leave: data.leave}}/>
          <Oraculo props={props} data={{oraculo: data.oraculo}}/>
        </>
      }
      </>
    }


  </>)
}

export default Extra