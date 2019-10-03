
var firebase = require("firebase-admin");
var serviceAccount = require("../config/serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://first-project-83b31.firebaseio.com"
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


