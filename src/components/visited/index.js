import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Subject } from 'rxjs'
import { connect } from 'react-redux'
import { getRESTAPICountries } from 'redux/action-creators/countries/get-rest-api-countries'

import { Country } from 'components/country'
import { CONNECTED_CountryModal } from 'components/country-visited-modal'
import { fadeIn } from 'components/react-modal-adapter'
import { BRAND_COLOR } from 'styles'

let inputStream = new Subject()

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
    justify-content: flex-end;

    & > p {
        color: ${BRAND_COLOR};
        font-size: 25px;
        margin: 0;
    }
`

const Total = styled.div`
    align-items: center;
    border-radius: 8px;
    background: ${BRAND_COLOR};
    color: #323c46;
    display: flex;
    height: 15px;
    font-size: 18px;
    justify-content: center;
    padding: 5px;
    width: 75px;
`

const CountriesList = styled.div`
    animation: ${fadeIn} 1s;
    min-height: 465px;
    width: 900px;

    & > div {
        display: flex;
        flex-wrap: wrap;
        height: 0;
    }
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
    height: 135px;
    margin: 10px 10px 0 10px;
    width: 135px;

    & > p {
        color: ${BRAND_COLOR};
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
    color: #ccc;
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

const CountriesMap = styled.div`
    margin-right: 100px;
    width: 765px;
`

const Pagination = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

const PageNumber = styled.div`
    border: 1px solid ${BRAND_COLOR};
    background: ${({ selectedPage }) => (selectedPage ? BRAND_COLOR : '#323C46')};
    color: ${({ selectedPage }) => (selectedPage ? '#323C46' : BRAND_COLOR)};
    cursor: pointer;
    margin-right: 5px;
    padding: 5px;
`

const NoTrips = styled.div`
    color: #ccc;
`

const Visited = ({ ui, user }) => {
    const [filteredCountries, setFilteredCountries] = useState([])
    const [isModalOpen, setModalOpen] = useState(false)
    const [selectedContinent, setSelectedContinent] = useState(null)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setFilteredCountries(user.userVisitedCountries)
    }, [user])

    const filterCountriesByValue = (value) => {
        if (!value) {
            return setFilteredCountries(user.userVisitedCountries)
        }
        setFilteredCountries(user.userVisitedCountries.filter((country) => country.name.toLowerCase().includes(value)))
    }

    const filterCountriesByContinent = (continent) => {
        setSelectedContinent(continent)
        setPage(1)
        if (!continent) {
            return setFilteredCountries(user.userVisitedCountries)
        }

        return setFilteredCountries(user.userVisitedCountries.filter((country) => country.continent === continent.name))
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

    const start = page === 1 ? 0 : 14
    const end = page === 2 ? 28 : 14

    return !ui.loading ? (
        <Container>
            <CountriesVisitedContainer>
                <CountriesMap>
                    <VisitedTotal>
                        <Total>{user.userVisitedCountries.length} / 195</Total>
                    </VisitedTotal>
                    <CountriesList>
                        <div style={{ display: 'flex' }}>
                            <AddVisit onClick={() => setModalOpen(true)}>
                                <img src={'/images/addTrip.svg'} />
                                <p>Add a visit</p>
                            </AddVisit>
                            {user && filteredCountries.length ? (
                                filteredCountries
                                    .slice(start, end)
                                    .map((country) => (
                                        <Country country={country} selectedContinent={selectedContinent} />
                                    ))
                            ) : (
                                <NoTrips>Trips will appear here once you've added them</NoTrips>
                            )}
                        </div>
                    </CountriesList>
                    <Pagination>
                        <PageNumber selectedPage={page === 1} onClick={() => setPage(1)}>
                            1
                        </PageNumber>
                        {filteredCountries.length > 14 ? (
                            <PageNumber selectedPage={page === 2} onClick={() => setPage(2)}>
                                2
                            </PageNumber>
                        ) : null}
                    </Pagination>
                </CountriesMap>

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
            Retrieving trips...
        </LoadingContainer>
    )
}

const mapState = ({ countries, ui, user }) => ({
    countries,
    ui,
    user,
})

const mapDispatch = {
    getRESTAPICountries,
}

export const CONNECTED_Visited = connect(mapState, mapDispatch)(Visited)
