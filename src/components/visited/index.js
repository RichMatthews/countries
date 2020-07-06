import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Subject } from 'rxjs'
import { connect } from 'react-redux'

import { Input } from 'components/shared/input'
import { Country } from 'components/country'
import { fadeIn } from 'components/react-modal-adapter'
import { KIERAN_GREY } from 'styles'
import { QuickAddCountryContainer } from 'components/select-countries'

let inputStream = new Subject()

const Container = styled.div`
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    position: absolute;
    overflow: auto;
    padding-top: 100px;
    width: 100%;

    @media (max-width: 700px) {
        flex-direction: column;
        padding-top: 80px;
    }
`

const ImageAndSearch = styled.div`
    & > img {
        position: absolute;
        margin-top: 11px;
        margin-left: 10px;
    }

    @media (max-width: 700px) {
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin-bottom: 10px;
        width: 100%;
    }
`

const StyledInput = styled(Input)`
    background: #fff;
    border: 1px solid #d1d8e2;
    box-sizing: border-box;
    border-radius: 6px;
    color: #31404f;
    font-size: 14px;
    height: 34px;
    width: 257px;

    @media (max-width: 700px) {
        margin-bottom: 0;
        padding-left: 10px;
        width: 40%;
    }
`

const VisitedTotal = styled.div`
    align-items: center;
    color: #1c1c1c;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 15px;

    & div:first-child {
        display: flex;
        flex-direction: row;
    }

    & > div > h3 {
        color: #4a4947;
        font-size: 48px;
        margin: 0;
    }

    @media (max-width: 700px) {
        flex-direction: column;
    }
`

// animation: ${fadeIn} 2s;
const CountriesList = styled.div`
    display: flex;
    flex-wrap: wrap;

    & > div {
        margin: 10px;
    }

    &::after {
        content: '';
        flex: 1 1 100%;
        max-width: 47%;
    }

    @media (max-width: 700px) {
        display: flex;
        justify-content: space-evenly;
        min-height: 0;
    }
`

const AddVisit = styled.div`
    background: ${KIERAN_GREY};
    border-radius: 30px;
    color: #fff;
    padding: 5px;
    text-align: center;
    width: 100px;
`

const Continents = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 15px;
    padding-bottom: 10px;

    @media (max-width: 700px) {
        margin-bottom: 0;
    }
`

const Continent = styled.div`
    align-items: center;
    background: ${({ isselected }) => (isselected ? '#31404F' : '#fff')};
    color: ${({ isselected }) => (isselected ? '#fff' : '#31404F')};
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(41, 51, 57, 0.5);
    cursor: pointer;
    display: flex;
    justify-content: center;
    font-size: 13px;
    flex-direction: column;
    height: 65px;
    margin: 10px;
    padding: 6px;
    width: 65px;

    & > img {
        width: 50px;
    }

    @media (max-width: 700px) {
        font-size: 10px;
        height: 35px;
        padding: 10px;
        margin: 5px;
        width: 35px;
        & > img {
            width: 20px;
        }
    }
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

    @media (max-width: 700px) {
        border-bottom: 1px solid #c9c9c9;
        & > div {
            padding: 0;
            width: auto;
        }
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
    @media (max-width: 700px) {
        padding-top: 3px;
    }
`

const LoadingContainer = styled.div`
    align-items: center;
    color: ${KIERAN_GREY};
    display: flex;
    flex-direction: column;
    padding-top: 100px;
`

const ResetButton = styled.div`
    align-items: center;
    background: ${KIERAN_GREY};
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    display: flex;
    height: 30px;
    font-size: 12px;
    justify-content: center;
    text-align: center;
    width: 66%;

    @media (max-width: 700px) {
        width: 40%;
    }
`

const CountriesMap = styled.div`
    width: 100%;
`

const Pagination = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 5px;

    @media (max-width: 700px) {
        display: none;
    }
`

const PageNumber = styled.div`
    border: 1px solid ${KIERAN_GREY};
    background: ${({ selectedPage }) => (selectedPage ? KIERAN_GREY : '#fff')};
    border-radius: 3px;
    color: ${({ selectedPage }) => (selectedPage ? '#fff' : KIERAN_GREY)};
    cursor: pointer;
    margin-right: 5px;
    padding: 5px;
`

const NoTrips = styled.div`
    align-items: center;
    color: ${KIERAN_GREY};
    display: flex;
`

const MainHeading = styled.div`
    color: #4a4947;
    width: 100%;
    font-size: 48px;

    @media (max-width: 700px) {
        font-size: 32px;
        margin-bottom: 10px;
    }
`
// check this
const comparator = (previous, next) => {
    if (previous.userTrips.visitedCountries.length > 0) {
        if (previous.userTrips.visitedCountries === next.userTrips.visitedCountries) {
            return true
        }
    }
    return false
}

const continents = [
    { name: 'Africa', svg: '/images/continents/africa', 'svg-light': '/images/continents/africa-light' },
    { name: 'Oceania', svg: '/images/continents/oceania', 'svg-light': '/images/continents/oceania-light' },
    { name: 'Asia', svg: '/images/continents/asia', 'svg-light': '/images/continents/asia-light' },
    { name: 'Europe', svg: '/images/continents/europe', 'svg-light': '/images/continents/europe-light' },
    {
        name: 'North America',
        svg: '/images/continents/north-america',
        'svg-light': '/images/continents/north-america-light',
    },
    {
        name: 'South America',
        svg: '/images/continents/south-america',
        'svg-light': '/images/continents/south-america-light',
    },
]

const Visited = React.memo(({ ui, userTrips }) => {
    const [filteredCountries, setFilteredCountries] = useState([])
    const [showAddCountryForm, setShowAddCountryForm] = useState(false)
    const [selectedContinent, setSelectedContinent] = useState(null)
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState([1])
    const [pageMapping, setPageMapping] = useState({ start: 0, end: 30 })

    useEffect(() => {
        if (userTrips.visitedCountries.length > 0) {
            setFilteredCountries(userTrips.visitedCountries)
            workoutRequiredPages(userTrips.visitedCountries)
        }
    }, [userTrips.visitedCountries])

    const filterCountriesByValue = (value) => {
        if (!value) {
            return setFilteredCountries(userTrips.visitedCountries)
        }
        setFilteredCountries(userTrips.visitedCountries.filter((country) => country.name.toLowerCase().includes(value)))
    }

    const filterCountriesByContinent = (continent) => {
        setSelectedContinent(continent)
        setPageHelper(1)
        if (!continent) {
            return setFilteredCountries(userTrips.visitedCountries)
        }

        return setFilteredCountries(
            userTrips.visitedCountries.filter((country) => country.continent === continent.name),
        )
    }

    inputStream.subscribe((val) => filterCountriesByValue(val))

    const workoutRequiredPages = () => {
        const pages = Math.ceil(userTrips.visitedCountries.length / 10)
        let newPages = []
        for (let i = 0; i < pages; i++) {
            newPages.push(i + 1)
        }
        setPages(newPages)
    }

    const setPageHelper = (page) => {
        setPage(page)
        if (page === 1) {
            setPageMapping({ start: 0, end: 10 })
        } else {
            setPageMapping({ start: page * 10 - 10, end: page * 10 })
        }
    }

    return !ui.loading ? (
        showAddCountryForm ? (
            <QuickAddCountryContainer setShowAddCountryForm={setShowAddCountryForm} />
        ) : (
            <Container>
                <ContinentsContainer>
                    <div>
                        <p>Filter trips by continent</p>
                        <Continents>
                            {continents.map((continent) => (
                                <Continent
                                    key={continent.name}
                                    onClick={() => filterCountriesByContinent(continent)}
                                    isselected={selectedContinent && selectedContinent.name === continent.name}
                                >
                                    <img
                                        src={
                                            selectedContinent && selectedContinent.name === continent.name
                                                ? `${continent['svg-light']}.svg`
                                                : `${continent.svg}.svg`
                                        }
                                    />
                                    <ContinentName>{continent.name}</ContinentName>
                                </Continent>
                            ))}
                        </Continents>

                        <ImageAndSearch>
                            <StyledInput
                                onChange={(e) => inputStream.next(e.target.value)}
                                placeholder="Enter Country Name"
                            />
                            <ResetButton onClick={() => filterCountriesByContinent(null)}>Reset Filters</ResetButton>
                        </ImageAndSearch>
                    </div>
                </ContinentsContainer>

                <CountriesMap>
                    <VisitedTotal>
                        <div>
                            <MainHeading>Your trips</MainHeading>
                        </div>
                        <AddVisit onClick={() => setShowAddCountryForm(true)}>Add visit</AddVisit>
                    </VisitedTotal>
                    <CountriesList>
                        {userTrips && filteredCountries.length ? (
                            filteredCountries
                                .slice(pageMapping.start, pageMapping.end)
                                .map((country) => (
                                    <Country
                                        key={country.name}
                                        country={country}
                                        selectedContinent={selectedContinent}
                                    />
                                ))
                        ) : (
                            <NoTrips>Trips will appear here once you've added them</NoTrips>
                        )}
                    </CountriesList>

                    <Pagination>
                        {pages.map((pg) => (
                            <PageNumber key={pg} selectedPage={page === pg} onClick={() => setPageHelper(pg)}>
                                {pg}
                            </PageNumber>
                        ))}
                    </Pagination>
                </CountriesMap>
            </Container>
        )
    ) : (
        <LoadingContainer>
            <img src="/images/loading.gif" width="30" alt="" />
            Retrieving trips...
        </LoadingContainer>
    )
}, comparator)

const mapState = ({ countries, ui, userTrips }) => ({
    countries,
    ui,
    userTrips,
})

export const CONNECTED_Visited = connect(mapState, null)(Visited)
