import Loading from './../Loading'
import Error from './../Error'

import FetchPoint from './../fetchPoint'

import LevelToggle from './LevelToggle'
import Store from './Shop'

import {propBType} from './../../Panel.d'

const Levels = ({props} : propBType) => {
  const data = FetchPoint(props.guild, "/api/levels")
  return (<>
    {data === "loading" && <Loading/>}

    {data === "error" ? <Error/>
    :
      <>
      {data !== undefined && data !== "loading" &&
        
        <>

          <LevelToggle props={props} data={{enabled: data.enabled, channels: data.channels}}/>
          <Store props={props} data={{shop: data.shop}}/>

        </>
      }
      </>
    }
  </>)
}

export default Levels