const firebase = require('firebase')

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
    context.callbackWaitsForEmptyEventLoop = false
    const mapId = event['queryStringParameters']['mapId'] || ''
    let readData = firebaseApp.database().ref(`sharedMaps/${mapId}`)

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
