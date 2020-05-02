import React from 'react'
import styled from 'styled-components'
import { Chart } from 'react-google-charts'

const Container = styled.div`
    background: #e3dfde;
    border-radius: 5px;
    height: 500px;
    position: absolute;
    opacity: 1;
    width: 1000px;
    z-index: 99999;
`

const Inner = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 5px;
`

const Left = styled.div`
    height: 400px;
    width: 350px;
`

const Right = styled.div``

const RightTop = styled.div``
const RightBottom = styled.div``

const CountryHeading = styled.h3`
    margin: 0;
    text-align: center;
`

const Top = styled.div`
    align-items: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: #55aac2;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 10px;
`

const Close = styled.div`
    position: absolute;
    right: 25px;
    cursor: pointer;
`

const Visits = styled.div`
    background: #55aac2;
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 5px;
`

export const CountryInformation = ({ country, setShowModal, showModal }) => {
    return (
        <Container>
            <Top>
                <CountryHeading>{country.name}</CountryHeading>
                <Close onClick={() => setShowModal(!showModal)}>X</Close>
            </Top>
            <Inner>
                <Left>
                    <h4>Trips</h4>
                    {country.visits.map((visit) => (
                        <Visits>
                            {visit.startDate} - {visit.endDate}
                        </Visits>
                    ))}
                </Left>
                <Right>
                    <RightTop>
                        <img src={country.flag} width="299" />
                    </RightTop>
                    <RightBottom>
                        <Chart
                            width={'300px'}
                            height={'200px'}
                            chartType="GeoChart"
                            data={[
                                ['Country', 'Popularity'],
                                [country.name, 500],
                            ]}
                            mapsApiKey="scrambled"
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </RightBottom>
                </Right>
            </Inner>
        </Container>
    )
}
