const router = require('express').Router()

const alpacaController = require('../controllers/alpacaController')
const twitterController = require('../controllers/twitterController')
const paymentController = require('../controllers/paymentController')


router.get('/asset/:id', alpacaController.asset)
router.get('/tweets/:id', twitterController.getTweets)


router.get('/', function (req, res, next) {
  return res.render('index', {title: "Midterm - Site"});
});

router.get('/v1/home', paymentController.credit);

router.post("/v1/charge", paymentController.charge);

router.post("/v1/query", paymentController.query);

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