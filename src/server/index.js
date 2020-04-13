const express = require('express')
const bodyParser = require('body-parser')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express()
const PORT = 5000

const countries = [
    {
        name: 'Australia',
        visited: true,
        flag: 'https://restcountries.eu/data/aus.svg',
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
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Innsbruck', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Albania',
        visited: true,
        flag: 'https://restcountries.eu/data/alb.svg',
        visits: [
            {
                startDate: '',
                endDate: '',
                citiesVisited: ['Sydney', 'Melbourne'],
            },
        ],
    },
    {
        name: 'Belgium',
        visited: true,
        flag: 'https://restcountries.eu/data/bel.svg',
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

app.get('/api/countries', (req, res, next) => {
    res.json({ payload: countries })
})

app.get('/api/countries/name/:name', (req, res, next) => {
    const { name } = req.params
    const filteredCountries = countries.filter((country) => country.name.toLowerCase() === name)
    res.json({ payload: filteredCountries })
})

app.get('/api/visited', (req, res, next) => {
    const filteredCountries = countries.filter((country) => country.visited)
    res.json({ payload: filteredCountries })
})

app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    next()
})
