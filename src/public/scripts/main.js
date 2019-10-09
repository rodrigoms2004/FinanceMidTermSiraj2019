'use strict';

const config = {
  apiKey: 'AIzaSyB25j6lT8AjWq45mA3rRsHCwseEbEf-7ks',
  authDomain: 'midterm-siraj2019.firebaseapp.com',
  projectId: 'midterm-siraj2019',
  appId: '1:372335439565:web:3b030643b0c461cb794384'
}

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

function showSentiment(nivel, el1, el2){
	if (nivel < 0 )
		el1.style.width = (Math.abs(nivel / 3) * 100) + "%";
	else
		el2.style.width = (Math.abs(nivel / 3) * 100) + "%";
}

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let i in data) {
    let row = table.insertRow();
    let cell1 = row.insertCell();
    let date = new Date(data[i].created_at).toISOString().replace("T", " ").substr(0, 19)
    let text = document.createTextNode(date);
    cell1.style.width = '160px';
    cell1.appendChild(text);
    let cell2 = row.insertCell();
    text = document.createTextNode(data[i].text);
    cell2.appendChild(text);

  }
}
