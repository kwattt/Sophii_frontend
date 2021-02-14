import Loading from '../Loading'
import Error from '../Error'

import FetchPoint from '../fetchPoint'
import ServerP from './ServerP'

import {propBType} from './../../Panel.d'

const Basic = ({props} : propBType) => {
  const data = FetchPoint(props.guild, "/api/getGuildInfo")

  return (<>
    {data === "loading" && <Loading/>}

    {data === "error" ? <Error/>
    :
      <>
      {data !== undefined && data !== "loading" &&
        <>
          <ServerP props={props} data={data}/>
        </>
      }
      </>
    }

  </>)
}

export default Basic