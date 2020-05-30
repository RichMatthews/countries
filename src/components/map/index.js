import React, { useState } from 'react'
import { ReactModalAdapter } from 'components/react-modal-adapter'
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

    @media (max-width: 700px) {
        padding-top: 100px;
    }
`

const NoMap = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 100px;
`

const ShareMap = styled.div`
    background: #fff;
    cursor: pointer;
    padding: 15px;
    border-radius: 20px;
    position: absolute;
    right: 30px;
`

const StyledModal = styled(ReactModalAdapter)`
    &__overlay {
        &.ReactModal__Overlay--before-close {
            transition: all 500ms ease-in-out;
            opacity: 0;
        }
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background: rgba(49, 49, 49, 0.9);
        z-index: 1;
    }

    &__content {
        animation: ${fadeIn} 1s;
        position: absolute;
        top: 40px;
        left: 40px;
        right: 40px;
        bottom: 40px;
        border: none;
        background: #fff;
        overflow: hidden;
        border-radius: 4px;
        outline: none;
        height: 250px;
        width: 500px;
        margin: auto;
    }
`

const ClosedIcon = styled.img`
    cursor: pointer;
    height: 13px;
    position: absolute;
    right: 20px;
    top: 20px;
    width: 13px;
`

const InnerModal = styled.div`
    padding: 20px;
    & > input {
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #ccc;
        margin-top: 60px;
        margin-bottom: 60px;
        width: 400px;
    }
`

export const Map = ({ user }) => {
    const [showModal, setShowModal] = useState(false)
    const [generatedId, setGeneratedId] = useState(Date.now())

    const showModalAndGenerateId = () => {
        setShowModal(true)
        createShareLink()
    }

    const createShareLink = () => {
        const data = user.mapDetails
        const stringifiedData = JSON.stringify({ data, generatedId })
        fetch(`${process.env.REACT_APP_API_GATEWAY_URL}/countries/create-shared-map`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: stringifiedData,
        })
    }

    const calculateMapHeight = () => {
        if (window.innerWidth < 500) {
            return '400px'
        }
        return '1000px'
    }

    return user.mapDetails.length > 1 ? (
        <Container>
            <Chart
                width={calculateMapHeight()}
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
            {showModal ? (
                <StyledModal
                    isOpen={showModal}
                    closeTimeoutMS={500}
                    ariaHideApp={false}
                    onRequestClose={() => setShowModal(!showModal)}
                >
                    <InnerModal>
                        <ClosedIcon src="/images/cancel.svg" onClick={() => setShowModal(!showModal)} />
                        <div>Copy this link and share it on your favourite social media</div>
                        <input value={`${window.location.host}/${generatedId}/shared-map`} />
                    </InnerModal>
                </StyledModal>
            ) : null}
            <ShareMap onClick={showModalAndGenerateId}>Share your map!</ShareMap>
        </Container>
    ) : (
        <NoMap>Your map will appear here once you've added your first country</NoMap>
    )
}

const mapState = ({ user }) => ({
    user,
})

export const CONNECTED_Map = connect(mapState)(Map)
