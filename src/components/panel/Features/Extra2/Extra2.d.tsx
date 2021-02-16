export type AutoCT = {
  id: number,
  origen: string,
  target: string
}

export type PurgeT = {
  active?: number,
  name?: string,
  channel: string,
  hour: number,
  minute: number,
  utc: number
}