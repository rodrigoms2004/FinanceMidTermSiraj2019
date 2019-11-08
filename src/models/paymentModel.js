const { log } = require('../util/loggerTool')
const { firebase } = require('../services/firebase-service');

const paymentModel = {
    checkCredit: async(userID) => {
      try {
        let collection = firebase.firestore().collection('users');
        let document = collection.doc(userID);
         
          let credit = await document.get().then(function (doc) {	
          if (doc.exists) {
            return doc.data().totalCredit;
          }
          return 0;
        }).catch(function (error){
          log("paymentModel", "error", `Error message at checkCredit method ${error.message}`)
          return 0;
        });
        return credit;
      } catch(error) {
        log("paymentModel", "error", `Error message at checkCredit method ${error.message}`)
        return 0;
      };
    },

    addPayment: async(userID, charge, queries) => {
        let collection = firebase.firestore().collection('users');
        let document = collection.doc(userID);
        let newCharge = document.collection('payments').doc();

        return await firebase.firestore().runTransaction(function(transaction) {
            return transaction.get(document).then(function(doc) {
                if (doc.exists){
                    var data = doc.data();
                    transaction.update(document, {
                        totalCredit: data.totalCredit + queries
                    });
                }
                else{
                    collection.doc(userID).set({totalCredit: queries})
                    .catch(err => {
                        console.log('Error adding user', err);
                    });
                }   
                return transaction.set(newCharge, charge);
            })
            .catch(err => {
                log("loginModel", "error", `Error message at addPayment method ${error.message}`)
                console.log('Error getting document', err);
            });
        });
    }
}

module.exports = paymentModel
