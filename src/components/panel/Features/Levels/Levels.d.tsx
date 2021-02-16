import { ReactText } from "react"

export type LevelsT = {
  channels: channelsT
  enabled: boolean
  shop: Array<ShopT>
}

export type LevelToggleT = {
  enabled: boolean,
  channels: channelsT
}

export type channelsT = ReactText[]

export type ShopT = {
  name: string,
  type: number,
  channel: string,
  price: number,
  role: string
}