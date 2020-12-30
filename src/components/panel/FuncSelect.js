import Social from './Features/Social/Social'
import Msg from './Features/Msg/Msg'

const FuncSelect = ({selTab, props, setProps}) => {
  return (
    <>
      {selTab === "Social" &&
        <Social props={props}/>
      }
      {selTab === "Mensajes" &&
        <Msg props={props} setProps={setProps}></Msg>
      }
    </>
  )
}

export default FuncSelect