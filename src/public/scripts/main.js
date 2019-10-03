'use strict';
var config = {
    apiKey: "AIzaSyCU-SBrxvxd2Mh0GwLEYEppKFZsVIJD9SA",
    authDomain: "first-project-83b31.firebaseapp.com",
    projectId: "first-project-83b31",
    appId: "1:1076010716137:web:517890c1d45e0804071978"
};

firebase.initializeApp(config);

function signIn(provider) {
    firebase.auth()
        .signInWithPopup(provider)
        .then(function (result) {
            console.log(result);
            let token = result.credential.accessToken;
        }).catch(function (error) {
          alert(error);
        });
}

function signOut() {
    firebase.auth().signOut();
}

function initFirebaseAuth(func) {
    firebase.auth().onAuthStateChanged(func);
}
  
function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

function getUserName() {
    let username = firebase.auth().currentUser.displayName;
    if (!username)
      username = firebase.auth().currentUser.email
      return username;
}
  
function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}
  
function saveMessagingDeviceToken() {
    firebase.messaging().getToken().then(function(currentToken) {
      if (currentToken) {
        console.log('Got FCM device token:', currentToken);
        // Saving the Device Token to the datastore.
        firebase.firestore().collection('fcmTokens').doc(currentToken)
            .set({uid: firebase.auth().currentUser.uid});
      } else {
        requestNotificationsPermissions();
      }
    }).catch(function(error){
      console.error('Unable to get messaging token.', error);
    });
}
  
function requestNotificationsPermissions() {
    console.log('Requesting notifications permission...');
    firebase.messaging().requestPermission().then(function() {
      // Notification permission granted.
      saveMessagingDeviceToken();
    }).catch(function(error) {
      console.error('Unable to get permission to notify.', error);
    });
}

function addSizeToGoogleProfilePic(url) {
    if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
      return url + '?sz=150';
    }
    return url;
  }
  
  function postForm(path, params, method) {
    method = method || 'post';
    var form = document.createElement('form');
    form.setAttribute('method', method);
    form.setAttribute('action', path);

    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement('input');
            hiddenField.setAttribute('type', 'hidden');
            hiddenField.setAttribute('name', key);
            hiddenField.setAttribute('value', params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}
  
function addCheckoutMethod(elCheckout, elError, name, description, charge_amount, charge_currency, stripe_key, charge_queries) {
  const handler = StripeCheckout.configure({
    key: stripe_key,
    locale: 'auto',
    token: async token => {
      let res = await charge(token, description, charge_amount, charge_currency, charge_queries);
      console.log(res);
      if (res.hasOwnProperty('status') && res.status === "succeeded"){
        firebase.auth().currentUser.getIdToken()
          .then(idToken => {
          postForm('/v1/home', {userID: idToken}, 'get');  
          }).catch();				
      }
      else{
        return elError.innerHTML = "<p>Purchase Failed!</p>";
      }
    }
  });

  elCheckout.addEventListener('click', e => {
    e.preventDefault();
    handler.open({
        name: name,
        description: description,
        image: "https://stripe.com/img/documentation/checkout/marketplace.png",
        amount: charge_amount,
        currency: charge_currency,
    });
  });
  window.addEventListener('popstate', () => handler.close());
}

async function charge(token, description, amount, currency, queries) {
  const idToken =  await  firebase.auth().currentUser.getIdToken();

  const res = await fetch('/v1/charge', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
          token,
          userID: idToken,
          charge: {
              amount,
              description, 
              currency,
              queries
          },
      }),
  });
  const data = await res.json();
  return data;
}
