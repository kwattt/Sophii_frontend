import Loading from './../Loading'
import Error from './../Error'

import FetchPoint from './../fetchPoint'

import Stalk from './Stalk'
import StalkMsg from './StalkMsg'
import Birthday from './Birthday'

import {propBType} from './../../Panel.d'

const Extra = ({props} : propBType) => {
  const data = FetchPoint(props.guild, "/api/extra")

  return (<>
    {data === "loading" && <Loading/>}

    {data === "error" ? <Error/>
    :
      <>
      {data !== undefined && data !== "loading" &&
        <>

        <Stalk props={props} data={{stalk: data.stalk, role: data.role}}/>
        <StalkMsg props={props} data={{msg: data.msg}}/>
        <Birthday props={props} data={{bday: data.bday, bdaymsg: data.bdaymsg, bdayutc: data.bdayutc}}/>

        </>
      }
      </>
    }


  </>)
}

export default Extra;