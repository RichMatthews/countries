import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

const Production_firebaseConfig = {
    apiKey: 'AIzaSyBEBd5lVUlDr3CUYPDR2qhE-5RRjRBuD8M',
    authDomain: 'countries-5e1e5.firebaseapp.com',
    databaseURL: 'https://countries-5e1e5.firebaseio.com',
    projectId: 'countries-5e1e5',
    storageBucket: 'countries-5e1e5.appspot.com',
    messagingSenderId: '659521859435',
    appId: '1:659521859435:web:c1ecbe3433a55fff0f662e',
    measurementId: 'G-L6ZJB7SFN6',
}
const Dev_firebaseConfig = {
    apiKey: 'AIzaSyDqnmovBZFAVJ-kKJyMU8JN27JkBPd49HE',
    authDomain: 'countries-development.firebaseapp.com',
    databaseURL: 'https://countries-development.firebaseio.com',
    projectId: 'countries-development',
    storageBucket: 'countries-development.appspot.com',
    messagingSenderId: '742557780049',
    appId: '1:742557780049:web:265ea4981c094fb2469070',
    measurementId: 'G-XFDPZW61ZW',
}

let config
if (process.env.NODE_ENV === 'production') {
    config = Production_firebaseConfig
} else {
    config = Dev_firebaseConfig
}

export const firebaseApp = firebase.initializeApp(config)
