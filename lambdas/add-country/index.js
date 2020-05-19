const firebase = require('firebase/app')
require('firebase/database')

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
    let body = JSON.parse(event.body)
    context.callbackWaitsForEmptyEventLoop = false
    let setSchema
    let updateSchema
    let URL
    const { country, userId } = body

    if (body.country) {
        setSchema = body.country
        updateSchema = body.country.visits[0]
        URL = `users/${userId}/countries/${country.name}`
    } else {
        setSchema = body.achievement
        updateSchema = body.achievement
        URL = `users/${userId}/achievements/${body.achievement.title}`
    }

    const DOES_NODE_EXIST = firebaseApp.database().ref(URL)

    DOES_NODE_EXIST.once('value', (snapshot) => {
        if (snapshot.val()) {
            if (body.country) {
                URL = `${URL}/visits/${snapshot.val().visits.length}`
                firebaseApp.database().ref(URL).update(updateSchema)
            } else {
                firebaseApp.database().ref(URL).set(updateSchema)
            }

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
