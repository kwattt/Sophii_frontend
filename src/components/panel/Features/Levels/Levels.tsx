import Loading from './../Loading'
import Error from './../Error'

import FetchPoint from './../fetchPoint'

import LevelToggle from './LevelToggle'
import Store from './Shop'

import {propBType} from './../../Panel.d'
import { LevelsT } from './Levels.d'

const Levels = ({props} : propBType) => {
  const data : LevelsT | string = FetchPoint(props.guild, "/api/levels")
  return (<>
    {data === "loading" && <Loading/>}

    {data === "error" ? <Error/>
    :
      <>
      {data !== "loading" &&
      typeof data !== "string" &&  
        <>
          <LevelToggle props={props} data={{enabled: data.enabled, channels: data.channels}}/>
          <Store props={props} data={data.shop}/>
        </>
      }
      </>
    }
  </>)
}

export default Levels