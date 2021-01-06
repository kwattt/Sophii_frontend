import Social from './Features/Social/Social'
import Msg from './Features/Msg/Msg'
import Extra from './Features/Extra/Extra'
import Purge from './Features/Purge/Purge'
import Default from './Features/Default/Default'
import Basic from './Features/Basic/Basic'

const FuncSelect = ({selTab, props}) => {

  return (
    <>
      {selTab === "Inicio" &&
        <Default props={props}/>
      }
      {selTab === "Basico" &&
        <Basic props={props}/>
      }
      {selTab === "Social" &&
        <Social props={props}/>
      }
      {selTab === "Mensajes" &&
        <Msg props={props}/>
      }
      {selTab === "Extra" &&
        <Extra props={props}/>
      }
      {selTab === "Limpieza" &&
        <Purge props={props}/>
      }
    </>
  )
}

export default FuncSelect