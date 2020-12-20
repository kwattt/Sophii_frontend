
import {
  Select
} from "@chakra-ui/react"

const SelectChannel = ({channels, selected}) => {

  console.log(channels)

  return (
    <Select defaultValue={selected}>
      <OptionChannel props={channels}/>
    </Select>
  )
}

const OptionChannel = ({props}) => {

  return (
    <>
      {props.map((val) => {
        return <option key={val.id} value={val.id}>{val.name}</option>
      })
      }
    </>
  )

}

export default SelectChannel