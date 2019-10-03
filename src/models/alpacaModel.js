const { api } = require('../services/alpaca')
const { log } = require('../util/loggerTool')
const { alpaca } = require('../config/api')
const { APCA_API_KEY_ID, APCA_API_SECRET_KEY } = alpaca

const alpacaModel = {

  authOn: async() => {
    try {
      const { data } = await api.get(`/v2/account`, {
        'headers': {
          'Cache-Control': 'no-cache',
          'APCA-API-SECRET-KEY': `${APCA_API_SECRET_KEY}`,
          'APCA-API-KEY-ID': `${APCA_API_KEY_ID}`
        }
      })

      return data
    } catch (error) {
      log("alpacaModel", "error", `Error message ${error.message}`)
      return error.message
    }    
  },

  getAssetInfo: async(asset, login) => {
    try {

      if(login.hasOwnProperty('error')) {
        return { error: login }
      } 

      const { data } = await api.get(`/v2/assets/${String(asset).toUpperCase()}`, {
        'headers': {
          'Cache-Control': 'no-cache',
          'APCA-API-SECRET-KEY': `${APCA_API_SECRET_KEY}`,
          'APCA-API-KEY-ID': `${APCA_API_KEY_ID}`
        }
      })

      return data
    } catch (error) {
      log("alpacaModel", "error", `Error message ${error.message}`)
      return error.message
    }
  }

}

module.exports = alpacaModel
