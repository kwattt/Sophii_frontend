import Stats from './Stats'
import Sophii from './Sophii'

import {propBType} from './../../Panel.d'

const Default = ({props} : propBType) => {
  return (<>
    <Stats props={props}/>
    <Sophii />
  </>)
}

export default Default