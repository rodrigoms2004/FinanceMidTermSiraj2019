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

      const result = {
        sentiment: sentimentTweets,
        tweets : tweets
      }
      return res.status(200).send(result)
    } catch(error) {
      log("sentimentController", "error", `Error message ${error}`)
      return res.status(400).send({ message: error })
    }
  },

  getTweetsInternal: async (query) => {
    try {
      const token = await twitterModel.oauth2()
      const tweets = await twitterModel.searchTweets(token, query)
      
      const sentimentTweets = await sentimentModel.getTweets(tweets)

      const result = {
        sentiment: sentimentTweets,
        tweets : tweets
      }
      return result
    } catch(error) {
      log("sentimentController", "error", `Error message ${error}`)
      return { message: error }
    }
  }
}

module.exports = sentimentController


//   {
//   "sentiment": {
//     "sentimentValue": 3,
//     "success": true
//   },
//   "tweets": [
//       {
//           "created_at": "Mon Oct 07 22:00:12 +0000 2019",
//           "text": "Unqork Inc. gets $80 million, with the lead investor being Alphabet Inc.'s CapitalG.\n$GOOGL @unqork\nhttps://t.co/pU7uDXJ9Wp"
//       },
//       {
//           "created_at": "Mon Oct 07 21:58:36 +0000 2019",
//           "text": "You crave to have relevancy in my life. The only way you can achieve that is by sending. Then and only then, I will… https://t.co/0bWtxzo12M"
//       },
//       {
//           "created_at": "Mon Oct 07 21:52:44 +0000 2019",
//           "text": "Яндекс SEO или Оптимизация за пределами Google | 24Journal https://t.co/AmNSmwjQpC"
//       },
//       {
//           "created_at": "Mon Oct 07 17:23:47 +0000 2019",
//           "text": "Google...What Can I Say !! #google #googl #stock #tech #internet #goog #technology #epic #monster https://t.co/vhMOJBk95J"
//       },
//       {
//           "created_at": "Mon Oct 07 17:20:19 +0000 2019",
//           "text": "A Beginner’s Guide to Stock Investing. \n\nOn Amazon. \n\nLink: https://t.co/Nm3L7G4Zzw \n\n$FB $GOOGL $JPM $BAC $WFC… https://t.co/UnO7rp01kZ"
//       }
//   ]
// }