export interface accI {
  enabled: number,
  day: number,
  month: number,
  avatar: string,
  name: string
}

export type ControlT = {
  isOpen: boolean,
  onClose: () => void
}

export interface AccTypes {
  data: accI,
  Control: ControlT
}
