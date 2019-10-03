const twitterModel = require('../models/twitterModel')
const { log } = require('../util/loggerTool')

const twitterController = {

  getTweets: async (req, res) => {
    try {
      const query = req.params.id
      const token = await twitterModel.oauth2()

      const tweets = await twitterModel.searchTweets(token, query)
      
      return res.status(200).send(tweets)
    } catch(error) {
      log("twitterController", "error", `Error message ${error}`)
      return res.status(400).send({ message: error })
    }
  }

}

module.exports = twitterController
