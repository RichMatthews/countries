import React from 'react'
import styled from 'styled-components'

const StatComponent = styled.div`
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: #4a4947;
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 220px;
`
const Top3 = styled(StatComponent)`
    display: flex;
    padding: 10px;
    width: 210px;

    & div:first-child {
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 15px;
        margin: 0;
    }

    & > div {
        margin: 10px;
        font-size: 18px;
    }

    @media (max-width: 700px) {
        & > :first-child {
            font-size: 11px;
        }
        height: 150px;
        width: 150px;
    }
`

const Spinner = styled.img`
    width: 30px;
`

const SpinnerContainer = styled.div`
    margin: auto;
`

const Countries = styled.div`
    & > span {
        font-size: 10px;
    }
`

export const TopThreeCountries = ({ top3Countries }) => (
    <Top3>
        {top3Countries ? (
            <>
                <div>
                    Most Visited Countries
                    <img src="/images/aeroplane.svg" width="35" alt="" />
                </div>
                {top3Countries.map((country) => (
                    <Countries key={country.name}>
                        <img src={country.flag} width="25" alt="" /> {country.name}
                        <span> ({country.visits.length} visits)</span>
                    </Countries>
                ))}
            </>
        ) : (
            <SpinnerContainer>
                <Spinner src={'/images/loading.gif'} />
            </SpinnerContainer>
        )}
    </Top3>
)
