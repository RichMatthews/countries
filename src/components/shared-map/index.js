import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Chart } from 'react-google-charts'
import { Link } from 'react-router-dom'

import { fadeIn } from 'components/react-modal-adapter'
import { BRAND_COLOR } from 'styles'

const Container = styled.div`
    align-items: center;
    animation: ${fadeIn} 1.5s;
    background: #dbdbdb;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    padding-top: 30px;
`

const LoadingContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 200px;
`

const StyledChart = styled(Chart)`
    margin-top: 50px;
`

const NoMap = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 100px;
`

export const SharedMap = () => {
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const id = window.location.pathname.split('/')[1]
        fetch(`https://eaq7kxyf7d.execute-api.us-east-1.amazonaws.com/countries/get-shared-map?mapId=${id}`)
            .then((res) => res.json())
            .then((res2) => {
                setCountries(res2[0])
                setLoading(false)
            })
    }, [])

    return !loading ? (
        <Container>
            <div>
                Hey, I just created my countries visited map! Click <Link to="/visited">here</Link> to create yours
            </div>
            <StyledChart
                width={'1000px'}
                height={'575px'}
                chartType="GeoChart"
                data={countries}
                mapsApiKey="YAIzaSyBe80OhcYpEiTJ7xcYPySebKTUS30OW28M"
                rootProps={{ 'data-testid': '1' }}
                options={{
                    backgroundColor: 'transparent',
                    defaultColor: BRAND_COLOR,
                    marginTop: 50,
                    animation: {
                        startup: true,
                        duration: 2500,
                    },
                }}
            />
        </Container>
    ) : (
        <NoMap>Getting Map...</NoMap>
    )
}
