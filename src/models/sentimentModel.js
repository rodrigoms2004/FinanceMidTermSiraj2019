const { api } = require('../services/sentiment')
const { log } = require('../util/loggerTool')


const sentimentModel = {

  getTweets: async(tweets) => {
    try { 
      const config = {
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json'
        }
      }

      const requestBody = tweets
      const { data } = await api.post('/api/sentimentValue', JSON.parse(JSON.stringify(requestBody)), config)

      return data

    } catch (error) {
      log("sentimentModel", "error", `Error message ${error.message}`)
      return error.message
    }    
  }

}

module.exports = sentimentModel