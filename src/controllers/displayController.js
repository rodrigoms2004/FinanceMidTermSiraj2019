const paymentModel = require('../models/paymentModel')
const sentimentController = require('../controllers/sentimentController')
const displayModel = require('../models/displayModel')
const { log } = require('../util/loggerTool')

const displayController = {

    getDisplay: async (req, res) => {
        try {
            const _class = req.query._class || "metal"
            const _asset = req.query._asset || "EURGBP" 
            const _serie = req.query._serie || "EUR/GBP" 
            const _userID = req.query.userID || ""
            const _uid = req.body.uid || "1zrJ3ELK6kVEkWQoSXCyg5lZSwh1" 

            const credit = await paymentModel.checkCredit(_uid);
            if (credit){
                const sentimentTweets = await sentimentController.getTweetsInternal(_asset)
                const graphData = await displayModel.getCoins(_asset, _class, _serie)
                const tweets = JSON.stringify(sentimentTweets.tweets)
                .replace(/[\\]/g, '\\\\')
                .replace(/[\/]/g, '\\/')
                .replace(/[\b]/g, '\\b')
                .replace(/[\f]/g, '\\f')
                .replace(/[\n]/g, '\\n')
                .replace(/[\r]/g, '\\r')
                .replace(/[\t]/g, '\\t')
                .replace(/[\"]/g, '\\"')
                .replace(/\\'/g, "\\'"); 
    

                if (sentimentTweets.sentiment.success === true){
                    return res.render('chart', {title: "ML Signal", sentiment: sentimentTweets.sentiment.sentimentValue,
                                        tweets: tweets, graphData: graphData, serie: _serie});
                }
                else
                    return  res.status(200).send(sentimentTweets)
            }
            else{
                res.redirect("/v1/home&userId="+_userID)
            }
        } catch(error) {
            log("displayControllers", "error", `Error message ${error}`)
            return res.status(400).send({ message: error })
        }
    }
}

module.exports = displayController