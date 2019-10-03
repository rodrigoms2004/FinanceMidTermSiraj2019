const { api } = require('../services/twitter')
const qs = require('querystring')
const { log } = require('../util/loggerTool')
const { twitter } = require('../config/api')

const twitterModel = {

  oauth2: async() => {
    try {
      const { consumer_api_key, consumer_secret_key } = twitter
      const auth = 'Basic ' + new Buffer.from(`${consumer_api_key}:${consumer_secret_key}`).toString('base64')

      const config = {
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization': auth
        }
      }
      const requestBody = { grant_type: 'client_credentials' }
      const { data } = await api.post('/oauth2/token', qs.stringify(requestBody), config)
      
      return data

    } catch (error) {
      log("twitterModel", "error", `Error message ${error.message}`)
      return error.message
    }    
  },

  searchTweets: async({token_type, access_token}, query) => {
    try {
      const { number_of_tweets } = twitter
      const { data } = await api.get(`/1.1/search/tweets.json?q=${encodeURIComponent(query)}&count=${number_of_tweets}`, {
        'headers': {
          'Cache-Control': 'no-cache',
          'Authorization': `${token_type} ${access_token}`   
        }
      })
  
      const { statuses } = data
      const tweets = statuses.map((tweet) => {
        return {
          created_at: tweet.created_at,
          text: tweet.text
        }
      })
      return tweets
    } catch (error) {
      log("twitterModel", "error", `Error message ${error.message}`)
      return error.message
    }
  }

}

module.exports = twitterModel


