import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Subject } from 'rxjs'

import { Country } from 'components/country'
import { CountryModal } from 'components/country-visited-modal'
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
    padding: 10px;
    width: 200px;
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
    background: ${({ isselected }) => (isselected ? 'green' : '#fff')};
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

const LoadingContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 200px;
`

export const Visited = (props) => {
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [selectedContinent, setSelectedContinent] = useState(null)
    const [isModalOpen, setModalOpen] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setCountries(props.userVisitedCountries)
        setFilteredCountries(props.userVisitedCountries)
        setLoaded(true)
    }, [])

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
        console.log(countries, 'count')
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
                        <Total>{countries ? `${countries.length} / 195` : '0 / 195'}</Total>
                    </VisitedTotal>
                    <CountriesList>
                        <AddVisit onClick={() => setModalOpen(true)}>
                            <img src={'/images/addTrip.svg'} />
                            <p>Add a visit</p>
                        </AddVisit>

                        {countries.length ? (
                            filteredCountries.map((country) => (
                                <Country key={country.name} country={country} selectedContinent={selectedContinent} />
                            ))
                        ) : (
                            <div>You have no trips recorded so far</div>
                        )}
                    </CountriesList>
                </div>

                <CountryModal
                    isModalOpen={isModalOpen}
                    options={props.options}
                    restAPICountries={props.restAPICountries}
                    setModalOpen={setModalOpen}
                    user={props.user}
                />

                <ContinentsContainer>
                    <p>Filter by continent</p>
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
                                <ContinentName>{continent.name.toUpperCase()}</ContinentName>
                            </Continent>
                        ))}
                    </Continents>
                    <button onClick={() => filterCountriesByContinent(null)}>reset</button>

                    <Input
                        onChange={(e) => inputStream.next(e.target.value)}
                        placeholder="or start typing country name..."
                    />
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
