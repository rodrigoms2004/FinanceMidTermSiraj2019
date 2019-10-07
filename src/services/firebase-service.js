
const firebase = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");
const { firebase_api } = require('../config/api')

const { databaseURL } = firebase_api

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

module.exports = firebase;

module.exports.verifyToken = async (req, res, next) =>{
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
      return res.status(401).send('You are not authorized!')
  }
  catch(e){
    return res.status(401).send('You are not authorized!')
  }
}


