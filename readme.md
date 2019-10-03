# Week 5 - Midterm

Midterm application

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
  }
}
```

Using file */src/config/serviceAccountKey_example.json* as example, create a new file */src/config/serviceAccountKey.json* with:

```
{
  "type": "service_account",
  "project_id": "first-project...",
  "private_key_id": "YOUR PRIVATE KEY",
  "private_key": "-----BEGIN PRIVATE KEY-----YOUR KEY HERE-----END PRIVATE KEY-----\n",
  "client_email": "client email",
  "client_id": "CLIENT ID",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "CLIENT X509 CERT"
}
```

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
### Stripe
```
https://stripe.com/docs/recipes/custom-checkout
https://medium.com/@gordonnl/headless-stripe-payments-with-firebase-9b12639ea118
```
