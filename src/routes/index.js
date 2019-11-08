const router = require('express').Router()

const alpacaController = require('../controllers/alpacaController')
const twitterController = require('../controllers/twitterController')
const paymentController = require('../controllers/paymentController')
const sentimentController = require('../controllers/sentimentController')
const displayController = require('../controllers/displayController')

router.get('/asset/:id', alpacaController.asset)
router.get('/tweets/:id', twitterController.getTweets)

router.get('/sentiment/:id', sentimentController.getTweets)

router.get('/', function (req, res, next) {
  return res.render('index', {title: "ML Signal"});
});

router.get('/v1/home', paymentController.credit);

router.post("/v1/charge", paymentController.charge);

router.post("/v1/query", paymentController.query);

router.get("/v1/chart", displayController.getDisplay);

router.post("/v1/data", displayController.getData);

// Test route
router.get("/v2/chart", displayController.getDisplay);
router.get("/v2/data", displayController.getData);

// Test
router.get('/test', (req, res) => {
  //res.status(404).send('Hello world!')
  console.log(req.headers)
  const timestp = new Date()
  res.status(200).send({
   nome: 'Test API VBA',
   tempo: timestp.toJSON()
  })
})

module.exports = router