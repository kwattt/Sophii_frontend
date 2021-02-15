import Loading from '../Loading'
import Error from '../Error'

import FetchPoint from '../fetchPoint'

import Purge from './Purge/Purge'
import Autochannel from './Autochannel/Autochannel'

import { AutoCT, PurgeT } from './Extra2.d'

import { propBType } from '../../Panel.d'

const Extra2 = ({props} : propBType) => {
  const purge : Array<PurgeT> | string = FetchPoint(props.guild, "/api/purge")
  const autoch : Array<AutoCT> | string = FetchPoint(props.guild, "/api/autochannel")

  return (<>
    {(purge === "loading" || autoch === "loading") && <Loading/>}

    {(purge === "error" || autoch === "error") ? <Error/>
    :
      <>
      {(typeof autoch !== "string" && 
        typeof autoch !== "undefined" && 
        typeof purge !== "string" && 
        typeof purge !== "undefined"
      ) &&
        <>
          <Purge props={props} data={purge}/>
          <Autochannel props={props} data={autoch}/>
        </>
      }
      </>
    }
  </>)
}

export default Extra2;