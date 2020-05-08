import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Subject } from 'rxjs'
import { connect } from 'react-redux'
import { fetchData, fetchRESTCountries } from 'redux/action-creators/countries/get-user-visited-countries'
import { setRESTAPICountries } from 'redux/action-creators/countries/set-rest-api-countries'

import { Country } from 'components/country'
import { CONNECTED_CountryModal } from 'components/country-visited-modal'
import { fadeIn } from 'components/react-modal-adapter'

let inputStream = new Subject()

const Container = styled.div`
    align-items: flex-end;
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
    animation: ${fadeIn} 1s;
    display: flex;
    flex-wrap: wrap;
    width: 900px;
`

const Input = styled.input`
    border-radius: 5px;
    border: 1px solid #ccc2c9;
    color: #474747;
    font-weight: bold;
    font-size: 12px;
    height: 30px;
    margin: 10px 0 10px 0;
    text-align: center;
    width: 65%;
`

const AddVisit = styled.div`
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 107px;
    margin: 10px;
    width: 198px;

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
    background: ${({ isselected }) => (isselected ? '#54e1e8' : '#fff')};
    color: ${({ isselected }) => (isselected ? '#fff' : '#113331')};
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100px;
    margin: 10px;
    padding: 6px;
    width: 100px;
`

const ContinentsContainer = styled.div`
    align-items: center;
    background: #323c46;
    border-radius: 10px;
    display: flex;
    height: 400px;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    width: 400px;

    & > p {
        color: #fff;
        margin: 0;
    }
`

const ContinentName = styled.div`
    padding-top: 10px;
    text-align: center;
    text-transform: uppercase;
`

const LoadingContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 200px;
`

const ResetButton = styled.div`
    align-items: center;
    background: #113331;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    display: flex;
    height: 30px;
    font-size: 12px;
    justify-content: center;
    text-align: center;
    width: 66%;
`

const Visited = ({ countries, fetchData, fetchRESTCountries, user }) => {
    const [filteredCountries, setFilteredCountries] = useState([])
    const [isModalOpen, setModalOpen] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [selectedContinent, setSelectedContinent] = useState(null)

    useEffect(() => {
        fetchData()
        setFilteredCountries(user.userVisitedCountries)
        setLoaded(true)
    }, [user.userVisitedCountries])

    const filterCountriesByValue = (value) => {
        if (!value) {
            return setFilteredCountries(countries)
        }
        setFilteredCountries(countries.filter((country) => country.name.toLowerCase().includes(value)))
    }

    const filterCountriesByContinent = (continent) => {
        setSelectedContinent(continent)
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

    return loaded ? (
        <Container>
            <CountriesVisitedContainer>
                <div>
                    <VisitedTotal>
                        <p>Visited</p>
                        <Total>{countries ? `${user.userVisitedCountries.length} / 195` : '0 / 195'}</Total>
                    </VisitedTotal>
                    <CountriesList>
                        <AddVisit onClick={() => setModalOpen(true)}>
                            <img src={'/images/addTrip.svg'} />
                            <p>Add a visit</p>
                        </AddVisit>
                        {user && filteredCountries.length ? (
                            filteredCountries.map((country) => (
                                <Country key={country.name} country={country} selectedContinent={selectedContinent} />
                            ))
                        ) : (
                            <div>You have no trips recorded so far</div>
                        )}
                    </CountriesList>
                </div>

                <CONNECTED_CountryModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />

                <ContinentsContainer>
                    <p>Filter Visits</p>
                    <Continents>
                        {continents.map((continent) => (
                            <Continent
                                onClick={() => filterCountriesByContinent(continent)}
                                isselected={
                                    selectedContinent &&
                                    selectedContinent.name.toLowerCase() === continent.name.toLowerCase()
                                }
                            >
                                <img src={`${continent.svg}.svg`} width="50" />
                                <ContinentName>{continent.name}</ContinentName>
                            </Continent>
                        ))}
                    </Continents>

                    <Input
                        onChange={(e) => inputStream.next(e.target.value)}
                        placeholder="Or start typing country name..."
                    />
                    <ResetButton onClick={() => filterCountriesByContinent(null)}>Reset</ResetButton>
                </ContinentsContainer>
            </CountriesVisitedContainer>
        </Container>
    ) : (
        <LoadingContainer>
            <img src="/images/loading.gif" width="30" style={{ margin: 'auto' }} />
            Retrieving countries...
        </LoadingContainer>
    )
}

const mapState = ({ countries, user }) => ({
    countries,
    user,
})

const mapDispatch = {
    setRESTAPICountries,
    fetchData,
    fetchRESTCountries,
}

export const CONNECTED_Visited = connect(mapState, mapDispatch)(Visited)
