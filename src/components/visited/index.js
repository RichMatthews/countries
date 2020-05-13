import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Subject } from 'rxjs'
import { connect } from 'react-redux'
import { getRESTAPICountries } from 'redux/action-creators/countries/get-rest-api-countries'

import { Input } from 'components/country-visited-modal/components/shared/input'
import { Country } from 'components/country'
import { CONNECTED_CountryModal } from 'components/country-visited-modal'
import { fadeIn } from 'components/react-modal-adapter'
import { BRAND_COLOR, KIERAN_GREY } from 'styles'

let inputStream = new Subject()

const Container = styled.div`
    background: #f2f5f5;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 100%;
    height: 100%;
    position: absolute;

    width: 100%;
`

const ImageAndSearch = styled.div`
    & > img {
        position: absolute;
        margin-top: 11px;
        margin-left: 10px;
    }
`

const StyledInput = styled(Input)`
    background: #fff;
    border: 1px solid #d1d8e2;
    box-sizing: border-box;
    border-radius: 6px;
    color: #31404f;
    font-size: 16px;
    height: 40px;
    width: 257px;
`

const VisitedTotal = styled.div`
    align-items: center;
    border-bottom: 1px solid #c9c9c9;
    color: #1c1c1c;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;
    & > div {
    }

    & > div > h3 {
        color: #4a4947;
        font-size: 48px;
        margin: 0;
    }
`

const Total = styled.div`
    align-items: center;
    color: ##1c1c1c;
    display: flex;
    height: 65px;
    font-size: 18px;
    font-weight: 900;backgroun
    justify-content: center;
    padding: 5px;
`

const CountriesList = styled.div`
    animation: ${fadeIn} 1s;
    display: grid;
    grid-gap: 10px;
    min-height: 465px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 100px);

    & > div:nth-child(5n + 1) {
        grid-row: 1;
    }

    & > div:nth-child(5n + 2) {
        grid-row: 2;
    }

    & > div:nth-child(5n + 3) {
        grid-row: 3;
    }
    & > div:nth-child(5n + 4) {
        grid-row: 4;
    }
    & > div:nth-child(5n + 5) {
        grid-row: 5;
    }

    & > div {
        margin: 0;
        padding: 10px;
    }
`

const AddVisit = styled.div`
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 135px;
    width: 135px;

    & > p {
        color: ${BRAND_COLOR};
        margin: 0;
    }
`

const Continents = styled.div`
    border-bottom: 1px solid #c9c9c9;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
`

const Continent = styled.div`
    align-items: center;
    background: ${({ isselected }) => (isselected ? '#31404F' : '#fff')};
    color: ${({ isselected }) => (isselected ? '#fff' : '#31404F')};
    border-radius: 8px;
    box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    display: flex;
    justify-content: center;
    font-size: 13px;
    flex-direction: column;
    height: 65px;
    margin: 10px;
    padding: 6px;
    width: 65px;
`

const ContinentsContainer = styled.div`
    & > div {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 10px;

        width: 300px;
    }

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
    color: #f0f0f0;
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
    margin: 10px;
    height: 300px;
    width: 100%;
`

const Pagination = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

const PageNumber = styled.div`
    border: 1px solid ${BRAND_COLOR};
    background: ${({ selectedPage }) => (selectedPage ? BRAND_COLOR : '${KIERAN_GREY}')};
    color: ${({ selectedPage }) => (selectedPage ? '${KIERAN_GREY}' : BRAND_COLOR)};
    cursor: pointer;
    margin-right: 5px;
    padding: 5px;
`

const NoTrips = styled.div`
    align-items: center;
    color: #f0f0f0;
    display: flex;
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
            <ContinentsContainer>
                <div>
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
                                <ContinentName>{continent.name}</ContinentName>
                            </Continent>
                        ))}
                    </Continents>

                    <ImageAndSearch>
                        <img src="/images/search.svg" width="20" />
                        <StyledInput
                            onChange={(e) => inputStream.next(e.target.value)}
                            placeholder="Enter Country Name"
                        />
                    </ImageAndSearch>
                    <ResetButton onClick={() => filterCountriesByContinent(null)}>Reset</ResetButton>
                </div>
            </ContinentsContainer>

            <CONNECTED_CountryModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />

            <CountriesMap>
                <VisitedTotal>
                    <div>
                        <h3>Your trips</h3>
                    </div>
                    <Total>{user.userVisitedCountries.length} / 195 countries visited</Total>
                </VisitedTotal>
                <CountriesList>
                    <>
                        {user && filteredCountries.length ? (
                            filteredCountries
                                .slice(start, end)
                                .map((country) => <Country country={country} selectedContinent={selectedContinent} />)
                        ) : (
                            <NoTrips>Trips will appear here once you've added them</NoTrips>
                        )}
                    </>
                </CountriesList>
                {filteredCountries.length > 14 ? (
                    <Pagination>
                        <PageNumber selectedPage={page === 1} onClick={() => setPage(1)}>
                            1
                        </PageNumber>
                        <PageNumber selectedPage={page === 2} onClick={() => setPage(2)}>
                            2
                        </PageNumber>
                    </Pagination>
                ) : null}
            </CountriesMap>
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
