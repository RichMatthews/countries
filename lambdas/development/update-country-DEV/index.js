const firebase = require('firebase/app')
require('firebase/database')

const firebaseConfig = {
    apiKey: 'AIzaSyDqnmovBZFAVJ-kKJyMU8JN27JkBPd49HE',
    authDomain: 'countries-development.firebaseapp.com',
    databaseURL: 'https://countries-development.firebaseio.com',
    projectId: 'countries-development',
    storageBucket: 'countries-development.appspot.com',
    messagingSenderId: '742557780049',
    appId: '1:742557780049:web:265ea4981c094fb2469070',
    measurementId: 'G-XFDPZW61ZW',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

exports.handler = (event, context, callback) => {
    let body = JSON.parse(event.body)
    context.callbackWaitsForEmptyEventLoop = false
    const { country, userId } = body

    const setSchema = body.newDetails
    const URL = `users/${userId}/countries/${country}/visits`
    const DOES_NODE_EXIST = firebaseApp.database().ref(URL)

    DOES_NODE_EXIST.once('value', (snapshot) => {
        if (snapshot.val()) {
            firebaseApp.database().ref(URL).set(setSchema)

            callback(null, {
                body: JSON.stringify('Successfully set in firebase!'),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                },
                statusCode: 200,
            })
        } else {
            firebaseApp.database().ref(URL).set(setSchema)
            callback(null, {
                body: JSON.stringify('Successfully updated in firebase!'),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                },
                statusCode: 200,
            })
        }
    })
}
