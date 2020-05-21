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
    overflow: scroll;
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

    & div:first-child {
        display: flex;
        flex-direction: row;
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
    font-weight: 900;
    justify-content: center;
    padding: 0 5px 0 0;
`

// & > div:nth-child(5n + 1) {
//     grid-row: 1;
// }

// & > div:nth-child(5n + 2) {
//     grid-row: 2;
// }

// & > div:nth-child(5n + 3) {
//     grid-row: 3;
// }
// & > div:nth-child(5n + 4) {
//     grid-row: 4;
// }
// & > div:nth-child(5n + 5) {
//     grid-row: 5;
// }

const CountriesList = styled.div`
    animation: ${fadeIn} 1s;
    display: grid;
    grid-gap: 5px;
    min-height: 500px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 100px);

    @media (max-width: 1870px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 1275px) {
        grid-template-columns: repeat(1, 1fr);
    }

    & > div {
        margin: 0;
        padding: 13px;
    }
`

const AddVisit = styled.div`
    align-items: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 68px;

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
    color: ${KIERAN_GREY};
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: 50px;
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
    width: 100%;
`

const Pagination = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 5px;
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
`

const comparator = (prevProps, nextProps) => {
    console.log('prev', prevProps)
    console.log('next', nextProps)
    return true
}

const Visited = ({ ui, user }) => {
    const [filteredCountries, setFilteredCountries] = useState([])
    const [isModalOpen, setModalOpen] = useState(false)
    const [selectedContinent, setSelectedContinent] = useState(null)
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState([1])
    const [pageMapping, setPageMapping] = useState({ start: 0, end: 10 })

    useEffect(() => {
        setFilteredCountries(user.userVisitedCountries)
        workoutRequiredPages(user.userVisitedCountries)
    }, [user.userVisitedCountries])

    const filterCountriesByValue = (value) => {
        if (!value) {
            return setFilteredCountries(user.userVisitedCountries)
        }
        setFilteredCountries(user.userVisitedCountries.filter((country) => country.name.toLowerCase().includes(value)))
    }

    const filterCountriesByContinent = (continent) => {
        setSelectedContinent(continent)
        setPageHelper(1)
        if (!continent) {
            return setFilteredCountries(user.userVisitedCountries)
        }

        return setFilteredCountries(user.userVisitedCountries.filter((country) => country.continent === continent.name))
    }

    inputStream.subscribe((val) => filterCountriesByValue(val))

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

    const workoutRequiredPages = () => {
        const pages = Math.ceil(user.userVisitedCountries.length / 10)
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
        <Container>
            <ContinentsContainer>
                <div>
                    <p>Filter by continent</p>
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
                                    width="50"
                                    alt=""
                                />
                                <ContinentName>{continent.name}</ContinentName>
                            </Continent>
                        ))}
                    </Continents>

                    <ImageAndSearch>
                        <img src="/images/search.svg" width="20" alt="" />
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
                        <MainHeading>Your trips</MainHeading>
                        <AddVisit onClick={() => setModalOpen(true)}>
                            <img src={'/images/addTrip.svg'} alt="" />
                        </AddVisit>
                    </div>
                    <Total>{user.userVisitedCountries.length} / 195 countries visited</Total>
                </VisitedTotal>
                <CountriesList>
                    <>
                        {user && filteredCountries.length ? (
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
                    </>
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
    ) : (
        <LoadingContainer>
            <img src="/images/loading.gif" width="30" style={{ margin: 'auto' }} alt="" />
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
