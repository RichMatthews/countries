import express from 'express'
import { firebaseApp } from '../config.mjs'
import bodyParser from 'body-parser'
const app = express()
const PORT = 5000

const countries = [
    {
        name: 'Afghanistan',
        visited: false,
        flag: 'https://restcountries.eu/data/afg.svg',
        continent: 'Asia',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sarande'],
            },
        ],
    },
    {
        name: 'Albania',
        visited: true,
        flag: 'https://restcountries.eu/data/alb.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '30-08-20',
                endDate: '03-09-20',
                citiesVisited: ['Sarande'],
            },
            {
                startDate: '30-08-20',
                endDate: '03-09-20',
                citiesVisited: ['Sarande'],
            },
        ],
    },
    {
        name: 'Algeria',
        visited: false,
        flag: 'https://restcountries.eu/data/dza.svg',
        continent: 'Africa',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Andorra',
        visited: false,
        flag: 'https://restcountries.eu/data/and.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Angola',
        visited: false,
        flag: 'https://restcountries.eu/data/ago.svg',
        continent: 'Africa',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Australia',
        visited: true,
        flag: 'https://restcountries.eu/data/aus.svg',
        continent: 'Oceania',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Austria',
        visited: true,
        flag: 'https://restcountries.eu/data/aut.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Innsbruck', 'Melbourne'],
            },
        ],
    },

    {
        name: 'Belgium',
        visited: true,
        flag: 'https://restcountries.eu/data/bel.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },

    {
        name: 'Bolivia',
        visited: true,
        flag: 'https://restcountries.eu/data/bol.svg',
        continent: 'South America',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Bosnia',
        visited: true,
        flag: 'https://restcountries.eu/data/bih.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Bulgaria',
        visited: true,
        flag: 'https://restcountries.eu/data/bgr.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Canada',
        visited: true,
        flag: 'https://restcountries.eu/data/can.svg',
        continent: 'North America',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Croatia',
        visited: true,
        flag: 'https://restcountries.eu/data/hrv.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Czech Republic',
        visited: true,
        flag: 'https://restcountries.eu/data/cze.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Estonia',
        visited: true,
        flag: 'https://restcountries.eu/data/est.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'France',
        visited: true,
        flag: 'https://restcountries.eu/data/fra.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Georgia',
        visited: false,
        flag: 'https://restcountries.eu/data/geo.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Germany',
        visited: true,
        flag: 'https://restcountries.eu/data/deu.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Greece',
        visited: true,
        flag: 'https://restcountries.eu/data/grc.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Hungary',
        visited: true,
        flag: 'https://restcountries.eu/data/hun.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Iceland',
        visited: true,
        flag: 'https://restcountries.eu/data/isl.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Indonesia',
        visited: true,
        flag: 'https://restcountries.eu/data/idn.svg',
        continent: 'Asia',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Ireland',
        visited: true,
        flag: 'https://restcountries.eu/data/irl.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Italy',
        visited: true,
        flag: 'https://restcountries.eu/data/ita.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Latvia',
        visited: true,
        flag: 'https://restcountries.eu/data/lva.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Lithuania',
        visited: true,
        flag: 'https://restcountries.eu/data/ltu.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Luxembourg',
        visited: true,
        flag: 'https://restcountries.eu/data/lux.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Montenegro',
        visited: true,
        flag: 'https://restcountries.eu/data/mne.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Netherlands',
        visited: true,
        flag: 'https://restcountries.eu/data/nld.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Peru',
        visited: true,
        flag: 'https://restcountries.eu/data/per.svg',
        continent: 'South America',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Portugal',
        visited: true,
        flag: 'https://restcountries.eu/data/prt.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Romania',
        visited: true,
        flag: 'https://restcountries.eu/data/rou.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'San Marino',
        visited: true,
        flag: 'https://restcountries.eu/data/smr.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Slovakia',
        visited: true,
        flag: 'https://restcountries.eu/data/svk.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Spain',
        visited: true,
        flag: 'https://restcountries.eu/data/esp.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Sweden',
        visited: true,
        flag: 'https://restcountries.eu/data/swe.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Switzerland',
        visited: true,
        flag: 'https://restcountries.eu/data/che.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'UK',
        visited: true,
        flag: 'https://restcountries.eu/data/gbr.svg',
        continent: 'Europe',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'USA',
        visited: true,
        flag: 'https://restcountries.eu/data/usa.svg',
        continent: 'North America',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
]

// app.use(bodyParser.urlencoded({ extended: false }))
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use(bodyParser.json())

app.get('/api/countries', (req, res, next) => {
    // const { limit, offset } = req.query
    // const combined = Number(limit) + Number(offset)
    // const filteredCountries = countries.slice(offset, combined)
    // res.json({ payload: filteredCountries })
    res.json(countries)
})

app.get('/api/notifications', (req, res, next) => {
    const notifications = [{ text: 'hi i am a message' }, { text: 'a new message' }, { text: 'a new message 3' }]
    const num = Math.round(Math.random() * 10)
    if (num % 2 == 0) {
        res.json(notifications)
    } else {
        res.status(500).send()
    }
})

app.get('/api/countries/name/:name', (req, res, next) => {
    const { name } = req.params
    const filteredCountries = countries.filter((country) => country.name.toLowerCase() === name)
    res.json({ payload: filteredCountries })
})

app.get('/api/:id/visited', (req, res, next) => {
    const readCountries = firebaseApp.database().ref(`users/${req.params.id}`)
    readCountries.on('value', (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val()
            var myData = Object.keys(data).map((key) => {
                return data[key]
            })
            res.json(myData)
        } else {
            res.json([])
        }
    })
})

app.post('/api/add-country', (req, res, next) => {
    // const num = Math.round(Math.random() * 5)
    // if (num === 1) {
    //     res.status(200).json({ message: 'Details saved successfully!' })
    // } else {
    //     res.status(500).send()
    // }
    const { continent, country, date, flag, people, visitName, userID } = req.body
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
        } else {
            firebaseApp.database().ref(`users/${userID}/${country}`).set(setSchema)
        }
    })

    res.status(200).json({ message: 'Details saved successfully!' })
})

app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    next()
})
