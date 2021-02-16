import Loading from '../Loading'
import Error from '../Error'

import FetchPoint from '../fetchPoint'
import ServerP from './ServerP'

import {propBType} from './../../Panel.d'

type BasicT = {
  prefix: string
}

const Basic = ({props} : propBType) => {
  const data : BasicT | string = FetchPoint(props.guild, "/api/getGuildInfo")

  return (<>
    {data === "loading" && <Loading/>}

    {data === "error" ? <Error/>
    :
      <>
      {data !== "loading" &&
      typeof data !== "string" && 
        <>
          <ServerP props={props} data={data.prefix}/>
        </>
      }
      </>
    }

  </>)
}

export default Basic