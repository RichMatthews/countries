import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { getMostVisitedCountry } from 'redux/action-creators/user/get-most-visited-country'
import { KIERAN_GREY } from 'styles'

const Container = styled.div`
    padding-top: 70px;
`

const H3 = styled.h3`
    font-size: 32px;
    margin: 0;
`

const H4 = styled.h4`
    color: #ccc;
    margin: 10px;
`

const Countries = styled.div`
    align-items: flex-start;
    border-radius: 5px;
    box-shadow: 0 1px 4px rgba(41, 51, 57, 0.5);
    color: ${KIERAN_GREY};
    display: flex;
    flex-direction: column;
    margin: 30px;
    padding: 10px;
`

const CountryName = styled.span`
    font-size: 32px;
    text-transform: uppercase;
`

const Country = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`

const NameAndVisits = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const Visits = styled.div`
    background: ${KIERAN_GREY};
    border-radius: 50px;
    color: #fff;
    height: 50px;
    text-align: center;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Visit = styled.div`
    color: #ccc;
    font-size: 10px;
`

export const TopStats = ({ userStats }) => {
    useEffect(() => {
        getMostVisitedCountry()
    }, [userStats])

    return (
        <Container>
            <H3>Your no.1 stats</H3>

            <Countries>
                <Country>
                    <NameAndVisits>
                        <CountryName>{userStats.mostVisitedCountry.name}</CountryName>
                        <Visits>
                            {userStats.mostVisitedCountry.visits ? (
                                <>
                                    <div>{userStats.mostVisitedCountry.visits.length}</div> <Visit>visits</Visit>
                                </>
                            ) : (
                                <>
                                    <div>1</div> <Visit>visit</Visit>{' '}
                                </>
                            )}
                        </Visits>
                    </NameAndVisits>
                    <H4>Most visited country</H4>
                </Country>
            </Countries>

            <Countries>
                <Country>
                    <NameAndVisits>
                        <CountryName>{'NORTH AMERICA'}</CountryName>
                        <Visits>
                            <div>12</div>
                            <Visit>trips</Visit>
                        </Visits>
                    </NameAndVisits>
                    <H4>Most visited Continent</H4>
                </Country>
            </Countries>
        </Container>
    )
}

const mapState = ({ userStats }) => ({
    userStats,
})

const mapDispatch = {
    getMostVisitedCountry,
}

export const ConnectedTopStats = connect(mapState, mapDispatch)(TopStats)
