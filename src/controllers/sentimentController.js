const sentimentModel = require('../models/sentimentModel')
const twitterModel = require('../models/twitterModel')
const { log } = require('../util/loggerTool')

const sentimentController = {

  getTweets: async (req, res) => {
    try {
      const query = req.params.id
      const token = await twitterModel.oauth2()
      const tweets = await twitterModel.searchTweets(token, query)
      
      const sentimentTweets = await sentimentModel.getTweets(tweets)

      return res.status(200).send(sentimentTweets)
    } catch(error) {
      log("sentimentController", "error", `Error message ${error}`)
      return res.status(400).send({ message: error })
    }
  }

}

module.exports = sentimentController
