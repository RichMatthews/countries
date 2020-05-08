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
    context.callbackWaitsForEmptyEventLoop = false
    const { continent, country, date, flag, people, visitName, userID } = event
    const setSchema = {
        continent,
        flag,
        name: country,
        visits: [
            {
                startDate: date.split('-')[0],
                endDate: date.split('-')[0],
                visitName,
                people,
            },
        ],
    }

    const updateSchema = {
        startDate: date.split('-')[0],
        endDate: date.split('-')[0],
        visitName,
        people,
    }

    const doescountryexist = firebaseApp.database().ref(`users/${userID}/${country}`)

    doescountryexist.once('value', (snapshot) => {
        if (snapshot.val()) {
            const newTripId = snapshot.val().visits.length
            firebaseApp.database().ref(`users/${userID}/${country}/visits/${newTripId}`).update(updateSchema)
            callback(null, {
                body: JSON.stringify('Successfully set in firebase!'),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                statusCode: 200,
            })
        } else {
            firebaseApp.database().ref(`users/${userID}/${country}`).set(setSchema)
            callback(null, {
                body: JSON.stringify('Successfully updated in firebase!'),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                statusCode: 200,
            })
        }
    })
}
