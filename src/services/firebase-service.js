
const firebase = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");
const { firebase_api } = require('../config/api')
const { log } = require('../util/loggerTool')

const { databaseURL } = firebase_api

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

// module.exports.verifyToken = async (req, res, next) =>{
const verifyToken = async (req, res, next) =>{
  let idToken;
  if (req.body.userID){
    idToken = req.body.userID
  }
  else {
    idToken =  req.query.userID;
  }

  try{
    const decodedIdToken = await firebase.auth().verifyIdToken(idToken);
    
    if (decodedIdToken){  
      req.body.uid = decodedIdToken.uid
      return next();
    }
    else
      log("firebase-service", "error", `You are not authorized!`)
      return res.status(401).send('You are not authorized!')
  }
  catch(error) {
    log("firebase-service", "error", `error at verifyToken method: ${error}`)
    return res.status(401).send('You are not authorized!')
  }
}


module.exports = { firebase, verifyToken }