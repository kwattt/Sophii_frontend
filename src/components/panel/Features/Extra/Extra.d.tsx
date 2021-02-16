import { ReactText } from "react"

export type ExtraT = {
  stalk: number,
  role: roleT,
  msg: string,
  bday: string,
  bdaymsg: string,
  bdayutc: number
}

export type roleT = ReactText[]