import IsAuthorized from './../extra/Authorized'

const Panel = () => {
  const authorized = IsAuthorized()

  return (<>
      {
        authorized &&
        (
          <h1>:P</h1>
        )
      }
    </>
  )

}

export default Panel