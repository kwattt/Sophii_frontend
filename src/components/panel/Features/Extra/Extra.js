import Loading from './../Loading'
import Error from './../Error'

import FetchExtra from './fetchExtras'
import Stalk from './Stalk'
import StalkMsg from './StalkMsg'
import Birthday from './Birthday'

const Extra = ({props}) => {
  const data = FetchExtra(props.guild)

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

export default Extra