const paymentModel = require('../models/paymentModel')
const { log } = require('../util/loggerTool')
const path = require('path');
const { stripe_keys } = require('../config/api');
const { STRIPE_KEY_PUB, STRIPE_KEY_PRIV } = stripe_keys
const stripe = require("stripe")(STRIPE_KEY_PRIV);

const paymentController = {
  credit: async (req, res,) => {
    try {
      const credit = await paymentModel.checkCredit(req.body.uid);

      if (!credit){
        return res.render('payment', {title: "Midterm", api_key:`${STRIPE_KEY_PUB}`, 
           data_name: "Midterm - Site", val_1: 1000, val_2: 10000, val_3: 90000});
      }
      else{
        res.render('home', {title: 'Midterm - Site', credit: credit});
      }
    } catch(error) {
      log("paymentController", "error", `Error message ${error}`)
      return res.status(500).send({ message: error })
    }
  },

  query: async (req, res,) => {
    try {
      const credit = await paymentModel.checkCredit(req.body.uid);
      return res.status(200).send({ credit: credit });
    } catch(error) {
      log("paymentController", "error", `Error message ${error}`)
      return res.status(500).send({ message: error })
    }
  },

  charge: async (req, res) => {
    try {
      stripe.customers.create({
        email: req.body.token.email,
        card: req.body.token.id
      })
      .then(customer =>
        stripe.charges.create({
          amount: req.body.charge.amount,
          description: req.body.charge.description,
          currency: req.body.charge.currency,
          customer: customer.id
        }))
      .then(charge => {
          paymentModel.addPayment(req.body.uid, charge, req.body.charge.queries);
          res.status(200).send({status: "succeeded"});
      })
      .catch(err => {
        log("paymentController", "error", `Error message ${err}`)
        res.status(500).send({status: "failed"});
      });
      //const login = await loginModel.authOn(username, password)
    } catch(error) {
      log("paymentController", "error", `Error message ${error}`)
      return res.status(400).send({ message: error })
    }
  }
}

module.exports = paymentController
