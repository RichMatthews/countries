const firebase = require('firebase')

const firebaseConfig = {
    apiKey: 'AIzaSyBEBd5lVUlDr3CUYPDR2qhE-5RRjRBuD8M',
    authDomain: 'countries-5e1e5.firebaseapp.com',
    databaseURL: 'https://countries-5e1e5.firebaseio.com',
    projectId: 'countries-5e1e5',
    storageBucket: 'countries-5e1e5.appspot.com',
    messagingSenderId: '659521859435',
    appId: '1:659521859435:web:c1ecbe3433a55fff0f662e',
    measurementId: 'G-L6ZJB7SFN6',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

exports.handler = (event, context, callback) => {
    // if (event.body !== null && event.body !== undefined) {
    let body = JSON.parse(event.body)
    context.callbackWaitsForEmptyEventLoop = false
    const setSchema = body.country
    const updateSchema = body.country.visits

    const { country, userId } = body
    const URL = `users/${userId}/countries/${country.name}`
    const doescountryexist = firebaseApp.database().ref(URL)

    doescountryexist.once('value', (snapshot) => {
        if (snapshot.val()) {
            const newTripId = snapshot.val().visits.length
            firebaseApp.database().ref(URL).update(updateSchema)
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
    // } else {
    //     callback(null, {
    //         body: JSON.stringify('body not ok!'),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //         },
    //         statusCode: 400,
    //     })
    // }
}
