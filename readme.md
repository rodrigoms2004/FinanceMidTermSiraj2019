# Week 5 - Midterm

This application uses [ML Web service](https://github.com/rodrigoms2004/FinanceML_API) to analyse Twitter sentiments

[Jupyter Notebook](https://github.com/rodrigoms2004/FinanceMidTermSiraj2019/blob/master/notebook/Testing%20with%20Sentimenter.ipynb)

## Live example

[ML Signals](http://finance.rmsmath.com.br:3500)

## How to use

Click in **SIG-IN**

![alt text](https://github.com/rodrigoms2004/FinanceMidTermSiraj2019/blob/master/documentation/img/1-main.png)


Put your e-mail and password or sign-in with your Google Account, clique in **Register**

![alt text](https://github.com/rodrigoms2004/FinanceMidTermSiraj2019/blob/master/documentation/img/2-login.png)


Select a payment plan, make the payment, after that you will be redirected to the main screen 

![alt text](https://github.com/rodrigoms2004/FinanceMidTermSiraj2019/blob/master/documentation/img/3-pay.png)


Choose a stock

![alt text](https://github.com/rodrigoms2004/FinanceMidTermSiraj2019/blob/master/documentation/img/4-stocks.png)


**Enjoy it!**

![alt text](https://github.com/rodrigoms2004/FinanceMidTermSiraj2019/blob/master/documentation/img/5-enjoy.png)

## Microservice topology

A distribuited application

![alt text](https://github.com/rodrigoms2004/FinanceMidTermSiraj2019/blob/master/documentation/img/ML_Signals_topology.png)


### Requirements

Node version 10.15.0 or better

[NodeJS](https://nodejs.org)

Create an account in Alpaca

[Alpaca](https://alpaca.markets/)


Create a Twitter developer account, create a App and get your Twitter credentials:
*consumer_api_key, consumer_secret_key, access_token, access_token_secret*

[Twitter Developer](https://developer.twitter.com)


## Installation

Clone or download example, install the dependencies using:
```
npm install
```

Using file */src/config/api_example.js* as example, create a new file */src/config/api.js* with:

* your Alpaca credentials
* your Twitter credentials
* your Stripe credentials
* your Foreign Exchange Market credentials
* your Crypto Compare credentials

```
module.exports = {
  alpaca: {
    APCA_API_SECRET_KEY: 'YOUR SECRET KEY HERE',
    APCA_API_KEY_ID: 'YOUR KEY HERE'
  },
  twitter: {
    consumer_api_key: 'YOUR CONSUMER API HERE',
    consumer_secret_key: 'YOUR CONSUMER SECRET KEY HERE',
    access_token: 'YOUR ACCESS TOKEN HERE',
    access_token_secret: 'YOUR ACCESS TOKEN SECRET HERE',
    number_of_tweets: 100 // default 15 up to 100
  },
  stripe: {
    STRIPE_KEY_PUB: 'YOUR PUBLIC KEY HERE',
    STRIPE_KEY_PRIV: 'YOUR SECRET KEY HERE'
  },
  firebase_api : {
    apiKey: 'YOUR API KEY HERE',
    authDomain: 'YOUR DOMAIN HERE',
    databaseURL: ' YOUR DATABASE URL HERE firebaseio.com',
    projectId: 'YOUR PROJECT ID HERE',
    storageBucket: 'YOUR PROJECT ID HERE.appspot.com',
    messagingSenderId: 'YOUR MESSEGING SENDER ID HERE',
    appId: 'YOUR APP ID HERE',
    measurementId: 'YOUR MESUREMENTE ID HERE',
    databaseURL: 'https://YOUR PROJECT ID HERE.firebaseio.com',
  },
  fxmarket: {
    fxmarket_api_key: 'YOUR KEY HERE'
  },
  cryptocompare: {
    cryptocompare_api_key: 'YOUR KEY HERE'
  }
}
```

In Firebase: Project Settings > Service Accounts tab > Generate new private key
Download file and save it in src/config as *serviceAccountKey.json*


## Running

To run use *npm* or *nodemon*
```
npm start
```

To change port that application is listening to, access file */src/config/general.js*, and modify value of *serverPort*
```
module.exports = {
  serverPort: 3500,
  logdir: "log"
}
```

To put in production user PM2 for instance or Heroku

[PM2](http://pm2.keymetrics.io)

[Heroku](https://www.heroku.com)

## Using

From your broswer of from Postman access the URL below, fow instance to get intel about Apple stock
```
http://localhost:3500/api/asset/AAPL
```

It will result in the information:

```
{
  id: "b0b6dd9d-8b9b-48a9-ba46-b9d54906e415",
  class: "us_equity",
  exchange: "NASDAQ",
  symbol: "AAPL",
  status: "active",
  tradable: true,
  marginable: true,
  shortable: true,
  easy_to_borrow: true
}
```

Try another stocks...

GOOGL   Google

AAPL    Apple

PBR     Petrobrás

BMY     Bristol-Myers Squibb Company


## Useful links

[Manually Trading Stocks Using Postman and the Alpaca API](https://medium.com/automation-generation/manually-trading-stocks-using-postman-and-the-alpaca-api-f45542d33143)

[Standard search API](https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets)


### NLP (Natural Language Processing)

[TextBlob: Simplified Text Processing](https://textblob.readthedocs.io/en/dev/)

[TextBlob Sentiment: Calculating Polarity and Subjectivity](https://planspace.org/20150607-textblob_sentiment/)

[Python for NLP: Movie Sentiment Analysis using Deep Learning in Keras](https://stackabuse.com/python-for-nlp-movie-sentiment-analysis-using-deep-learning-in-keras)

[LSTM Sentiment Analysis | Keras](https://www.kaggle.com/ngyptr/lstm-sentiment-analysis-keras)

[Machine Learning — Word Embedding & Sentiment Classification using Keras](https://towardsdatascience.com/machine-learning-word-embedding-sentiment-classification-using-keras-b83c28087456)

### Firebase
```
https://codelabs.developers.google.com/codelabs/firebase-web/#15
https://github.com/balta-io/1965
https://medium.com/@_josueperalta/using-firebase-auth-with-a-custom-node-js-server-part-1-53bdb622c89a
https://codeforgeek.com/manage-session-using-node-js-express-4/
https://medium.com/novasemita/auth-using-firebaseui-firebase-functions-session-cookies-f2447bf42201
https://medium.com/@vladfr/use-cloud-firestore-with-async-bce875af0183
```

#### Firebase Firewall rules

[About FCM messages](https://firebase.google.com/docs/cloud-messaging/concept-options)

**Ports:**
* 5228
* 5229
* 5230

### Stripe
```
https://stripe.com/docs/recipes/custom-checkout
https://medium.com/@gordonnl/headless-stripe-payments-with-firebase-9b12639ea118
```

## Authors

* **Rodrigo Moraes Silveira**
*Git hub* - (https://github.com/rodrigoms2004)
*E-mail*  - rodrigoms2004@gmail.com
*Discord* - rodrigo.silveira#4776

* **Marco Alessandro de Campos**
*Git hub* - (https://github.com/titocampos)
*E-mail*  - titocampos@gmail.com
*Discord* - titocampos

* **Craig Austin**
*Git hub* - (https://github.com/WannaBreakout)
*E-mail*  - craig07may@gmail.com
*Discord* - cabin

* **Stefan Fricke**
*Git hub* - (https://github.com/Stefan566)
*E-mail*  - sfricke@sfricke.de
*Discord* - Stefan999
