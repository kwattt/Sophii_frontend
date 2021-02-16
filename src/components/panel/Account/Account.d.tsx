import {ControlT} from './../Panel.d'

export interface accI {
  enabled: number,
  day: number,
  month: number,
  avatar: string,
  name: string
}

export interface AccTypes {
  data: accI,
  Control: ControlT
}
