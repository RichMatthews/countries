import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Chart } from 'react-google-charts'
import { connect } from 'react-redux'

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
    & > * {
        stroke: red !important;
    }
`

export const Map = ({ user }) =>
    user.mapDetails.length > 1 ? (
        <Container>
            <StyledChart
                width={'1000px'}
                height={'575px'}
                chartType="GeoChart"
                data={user.mapDetails}
                mapsApiKey="YAIzaSyBe80OhcYpEiTJ7xcYPySebKTUS30OW28M"
                rootProps={{ 'data-testid': '1' }}
                options={{
                    backgroundColor: 'transparent',
                    defaultColor: BRAND_COLOR,
                    animation: {
                        startup: true,
                        duration: 2500,
                    },
                }}
            />
            <div>Share your map!</div>
        </Container>
    ) : (
        <LoadingContainer>
            <img src="/images/loading.gif" width="30" style={{ margin: 'auto' }} />
        </LoadingContainer>
    )

const mapState = ({ user }) => ({
    user,
})

const mapDispatch = {}

export const CONNECTED_Map = connect(mapState, mapDispatch)(Map)
