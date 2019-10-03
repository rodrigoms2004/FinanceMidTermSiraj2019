const { log } = require('../util/loggerTool')
const firebase = require('../services/firebase-service');

const paymentModel = {

    authOn: async(username, password) => {
        try {
            //const express = require('express');
            //const session = require('express-session');
            //const bodyParser = require('body-parser');
            //const path = require('path');
            const dao = new database("./db/mydb.db")
            const result = await dao.get("SELECT * FROM users WHERE login = ? and password = ?", [username, password])

            if (result){
                return {res: "OK"}
            }
            return {error: "error"}
        } catch (error) {
            log("loginModel", "error", `Error message ${error.message}`)
            return { error: error.message }
        }
    },
    
    checkCredit: async(userID) => {
        return firebase.firestore().collection('users').doc(userID).get().then(function (doc) {
            if (doc.exists) {
                return doc.data().totalCredit;
            }
            return 0;
        });
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
                console.log('Error getting document', err);
            });
        });
    }
}

module.exports = paymentModel
