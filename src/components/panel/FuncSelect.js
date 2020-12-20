import Social from './Features/Social'

const FuncSelect = ({selTab, props}) => {
  return (
    <>
      {selTab === "Social" &&
        <Social props={props}/>
      }
    </>
  )
}

export default FuncSelect