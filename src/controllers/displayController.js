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
                let graphData = await displayModel.getCoins(_asset, _class, _serie)
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
    
                if (!graphData) 
                    graphData = '{"2019-10-09": 0}';

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
    },
    
    getData: async (req, res) => {
        try {
            const _class = req.body._class || "cripto"
            const _asset = req.body._asset || "ETHEUR" 
            const _serie = req.body._serie || "ETH/EUR" 
            const _uid = req.body.uid || "NtlqBGdEWyfSoheclvBJfWq7Ory1" 
            const sentimentTweets = await sentimentController.getTweetsInternal(_asset)
            let graphData = await displayModel.getCoins(_asset, _class, _serie)

            if (!graphData) 
                graphData = '{"2019-10-09": 0}';

            if (sentimentTweets.sentiment.success === true){
                return res.status(200).send(
                    { ok: true, 
                    data: {
                        sentiment: sentimentTweets.sentiment.sentimentValue, 	
                        tweets: sentimentTweets.tweets, 
                        graphData: JSON.parse(graphData), 
                        serie: _serie
                      }
                });
            }
            else
               return res.status(200).send({ ok: false, error: sentimentTweets})
        } catch(error) {
            log("displayControllers", "error", `Error message ${error}`)
            return res.status(400).send({ message: error })
        }
    }
}

module.exports = displayController