import Loading from './../Loading'
import Error from './../Error'

import FetchPoint from './../fetchPoint'

import Stalk from './Stalk'
import StalkMsg from './StalkMsg'
import Birthday from './Birthday'

import {propBType} from './../../Panel.d'
import { ExtraT } from './Extra.d'

const Extra = ({props} : propBType) => {
  const data : ExtraT | string = FetchPoint(props.guild, "/api/extra")

  return (<>
    {data === "loading" && <Loading/>}

    {data === "error" ? <Error/>
    :
      <>
      {data !== "loading" &&
      typeof data !== "string" && 
        <>
        
        <Stalk props={props} data={{stalk: data.stalk, role: data.role}}/>
        <StalkMsg props={props} data={data.msg}/>
        <Birthday props={props} data={{bday: data.bday, bdaymsg: data.bdaymsg, bdayutc: data.bdayutc}}/>

        </>
      }
      </>
    }


  </>)
}

export default Extra;