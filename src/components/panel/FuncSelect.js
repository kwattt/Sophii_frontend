import Social from './Features/Social/Social'
import Msg from './Features/Msg/Msg'

const FuncSelect = ({selTab, props}) => {
  return (
    <>
      {selTab === "Social" &&
        <Social props={props}/>
      }
      {selTab === "Mensajes" &&
        <Msg props={props}></Msg>
      }
    </>
  )
}

export default FuncSelect