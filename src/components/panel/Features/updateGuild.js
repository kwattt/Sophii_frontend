import axios from 'axios'

const updateGuild = (guildInfo) => {
  axios.post("http://127.0.0.1:5001/api/updateGuild",
  {
    guild: guildInfo.guild,
    stalk: guildInfo.stalk,
    bday: guildInfo.bday,
    welcome: guildInfo.welcome
  })
}

export default updateGuild