import {FacebookT} from './Facebook/Facebook.d'
import {TwitchT} from './Twitch/Twitch.d'
import {TwitterT} from './Twitter/Twitter.d'
import {YoutubeT} from './Youtube/Youtube.d'

export type SocialT = {
  twitch: Array<TwitchT>
  facebook: Array<FacebookT>
  twitter: Array<TwitterT>
  youtube: Array<YoutubeT>
}