import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from '@reach/router'
import { of, interval, Subject, timer } from 'rxjs'
import { retryWhen, delayWhen } from 'rxjs/operators'

import { Country } from 'components/country'
import { CountryModal } from 'components/country-visited-modal'
import { LoggedOut } from 'components/logged-out'
import { createHttpObservable } from 'utils/'

let inputStream = new Subject()

let clickContinentStream = new Subject()

const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const VisitedTotal = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 200px;

    & > p {
        font-size: 25px;
        margin: 0;
    }
`

const Total = styled.div`
    align-items: center;
    border-radius: 8px;
    background: #3b89ab;
    color: #fff;
    display: flex;
    height: 15px;
    font-size: 18px;
    justify-content: center;
    padding: 5px;
    width: 75px;
`

const CountriesList = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 900px;
`

const Input = styled.input`
    border-radius: 5px;
    border: 1px solid #ccc2c9;
    padding: 10px;
    width: 200px;
`

const AddVisit = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80px;
    margin: 20px;
    width: 120px;

    & > p {
        margin: 0;
    }
`

const CountriesVisitedContainer = styled.div`
    display: flex;
`

const Continents = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    justify-content: center;
`

const Continent = styled.div`
    align-items: center;
    background: ${({ isSelected }) => (isSelected ? 'green' : '#fff')};
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100px;
    margin: 10px;
    width: 100px;
`

const ContinentsContainer = styled.div`
    align-items: center;
    background: #3baba4;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 350px;
    width: 400px;

    & > p {
        color: #fff;
        margin: 0;
    }
`

const ContinentName = styled.div`
    text-align: center;
`
export const Visited = (props) => {
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [selectedContinent, setSelectedContinent] = useState(null)
    const [isModalOpen, setModalOpen] = useState(false)
    // const [notifications, setNotifications] = useState([])

    useEffect(() => {
        if (props.user) {
            getCountries()
        }
        // fetchNotificationsOldSchool()
        // fetchNotificationsRxJs()
    }, [props.user])

    const fetchNotificationsOldSchool = async () => {
        // try {
        //     await fetch('/api/notifications')
        //         .then((res) => res.json())
        //         .then((data) => setNotifications(data))
        // } catch (e) {
        //     console.err(e)
        // }
    }

    // const fetchNotificationsRxJs = () => {
    //     const http$ = createHttpObservable('/api/notifications')
    //     const ex = http$.pipe(retryWhen((errors) => errors.pipe(delayWhen(() => timer(2000)))))

    //     ex.subscribe((data) => setNotifications(data))

    //     // return http$.subscribe((data) => setNotifications(data))
    // }

    const getCountries = () => {
        try {
            const http$ = createHttpObservable(`/api/${props.user.uid}/visited`)
            return http$.subscribe((data) => updateCountriesOnMount(data))
        } catch (e) {
            console.log(e, 'err')
        }
    }

    const updateCountriesOnMount = (data) => {
        setCountries(data)
        setFilteredCountries(data)
    }

    const filterCountriesByValue = (value) => {
        if (!value) {
            return setFilteredCountries(countries)
        }
        setFilteredCountries(countries.filter((country) => country.name.toLowerCase().includes(value)))
    }

    const filterCountriesByContinent = (continent) => {
        if (!continent) {
            return setFilteredCountries(countries)
        }
        return setFilteredCountries(countries.filter((country) => country.continent === continent.name))
    }

    inputStream.subscribe((val) => filterCountriesByValue(val))

    const continents = [
        { name: 'Africa', svg: '/images/continents/africa' },
        { name: 'Oceania', svg: '/images/continents/oceania' },
        { name: 'Asia', svg: '/images/continents/asia' },
        { name: 'Europe', svg: '/images/continents/europe' },
        { name: 'North America', svg: '/images/continents/north-america' },
        { name: 'South America', svg: '/images/continents/south-america' },
    ]

    return (
        <Container>
            {props.user ? (
                <CountriesVisitedContainer>
                    <div>
                        <VisitedTotal>
                            <p>Visited</p>
                            <Total>{countries ? `${countries.length} / 195` : '0 / 195'}</Total>
                        </VisitedTotal>
                        <CountriesList>
                            <AddVisit onClick={() => setModalOpen(true)}>
                                <img src={'/images/addTrip.svg'} />
                                <p>Add a visit</p>
                            </AddVisit>

                            {countries.length ? (
                                filteredCountries.map((country) => (
                                    <Country country={country} selectedContinent={selectedContinent} />
                                ))
                            ) : (
                                <div>You have no trips recorded so far</div>
                            )}
                        </CountriesList>
                    </div>

                    <CountryModal
                        isModalOpen={isModalOpen}
                        options={props.options}
                        setModalOpen={setModalOpen}
                        user={props.user}
                    />

                    <ContinentsContainer>
                        <p>Filter by continent</p>
                        <Continents>
                            {continents.map((continent) => (
                                <Continent
                                    onClick={() => filterCountriesByContinent(continent)}
                                    isSelected={
                                        selectedContinent &&
                                        selectedContinent.name.toLowerCase() === continent.name.toLowerCase()
                                    }
                                >
                                    <img src={`${continent.svg}.svg`} width="50" />
                                    <ContinentName>{continent.name.toUpperCase()}</ContinentName>
                                </Continent>
                            ))}
                        </Continents>
                        <Input
                            onChange={(e) => inputStream.next(e.target.value)}
                            placeholder="or start typing country name..."
                        />
                    </ContinentsContainer>
                </CountriesVisitedContainer>
            ) : (
                <LoggedOut />
            )}
        </Container>
    )
}

//
