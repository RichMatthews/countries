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
    const userID = event['queryStringParameters']['userId'] || ''
    let readData = firebaseApp.database().ref(`users/${userID}/countries`)

    if (event.resource.includes('achievements')) {
        readData = firebaseApp.database().ref(`users/${userID}/achievements`)
    }

    readData.off()

    try {
        readData.on('value', (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                const myData = Object.keys(data).map((key) => {
                    return data[key]
                })
                callback(null, {
                    body: JSON.stringify(myData),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    statusCode: 200,
                })
            } else {
                callback(null, {
                    body: JSON.stringify([]),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    statusCode: 200,
                })
            }
        })
    } catch (e) {
        callback(null, {
            body: JSON.stringify(e),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 400,
        })
    }
}
