import Social from './Features/Social/Social'
import Msg from './Features/Msg/Msg'
import Extra from './Features/Extra/Extra'

const FuncSelect = ({selTab, props, setProps}) => {
  return (
    <>
      {selTab === "Social" &&
        <Social props={props}/>
      }
      {selTab === "Mensajes" &&
        <Msg props={props} setProps={setProps}/>
      }
      {selTab === "Extra" &&
        <Extra props={props} setProps={setProps}/>
      }
    </>
  )
}

export default FuncSelect