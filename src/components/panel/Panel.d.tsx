export type ContentsT = {
  props: Array<string>
}

export type roleInfoT = {
  name: string, 
  id: string
}

export type channelInfoT = {
  name: string, 
  id: string
}

export interface guildInfoT {
  guild: string,
  roles: Array<roleInfoT>,
  channels: Array<channelInfoT>,
  stalk: number,
  bday: number,
  welcome: number,
  bdaymsg: string,
  bdayutc: string, 
  tipo: number,
  stats: {
    members: number,
    voice: number,
    text: number,
    icon: string,
    name: string
  }
}

export type optionChannelT = {
  props: Array<channelInfoT>
}

export type optionRolesT = {
  props: Array<roleInfoT>
}

export type serverSelectT = {
  setSel: any, 
  setTabIndex: any   
}

export type guildData = {
  name: string, 
  id: number
}
export type propBType = {
  props: guildInfoT
}