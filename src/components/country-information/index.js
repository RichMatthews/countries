import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { ReactModalAdapter, fadeIn } from 'components/react-modal-adapter'
import { KIERAN_GREY } from 'styles'

import { CONNECTED_VISIT } from './visit'

const ModalInner = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;

    @media (max-width: 700px) {
        flex-direction: column;
    }
`

const CountryHeading = styled.h3`
    border-bottom: 1px solid #ccc;
    color: #323c46;
    margin: 0;
    font-style: normal;
    font-weight: 900;
    font-size: 32px;
    line-height: 60px;
    margin: auto;
    margin-top: 20px;
    text-align: center;
    width: 80%;

    @media (max-width: 700px) {
        font-size: 20px;
        margin-top: 0;
    }
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
        height: 650px;
        margin: auto;
    }
`

const Left = styled.div`
    width: 33%;

    @media (max-width: 700px) {
        height: 100%;
        overflow-y: scroll;
        width: 100%;
    }
`

const Right = styled.div`
    background-image: ${({ country }) =>
        `url(https://dl6ghv8ryvhmk.cloudfront.net/countries/${country}.jpg), url(https://dl6ghv8ryvhmk.cloudfront.net/countries/generic.jpg)`};
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 67%;
`

const ClosedIcon = styled.img`
    cursor: pointer;
    height: 13px;
    position: absolute;
    right: 20px;
    top: 20px;
    width: 13px;
`

const ExtraDetails = styled.div`
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 33%;
    align-items: flex-end;
    & > div {
        background: ${KIERAN_GREY};
        border-radius: 3px;
        color: #fff;
        cursor: pointer;
        font-size: 12px;
        margin: 5px;
        padding: 10px;
        width: 103px;
    }
`

const Visits = styled.div`
    max-height: 400px;
    overflow-y: auto;
    margin: 35px;
`

export const CountryInformation = ({ country, setShowModal, showModal }) => {
    return (
        <StyledModal
            isOpen={showModal}
            closeTimeoutMS={500}
            ariaHideApp={false}
            onRequestClose={() => setShowModal(!showModal)}
        >
            <ModalInner>
                <ClosedIcon src="/images/cancel.svg" onClick={() => setShowModal(!showModal)} />
                <Left>
                    <CountryHeading>{country.name}</CountryHeading>
                    <Visits>
                        {country.visits.map((visit) => {
                            const people = visit.people ? visit.people.split(',') : []
                            const places = visit.places ? visit.places.split(',') : []
                            return <CONNECTED_VISIT country={country.name} visit={{ ...visit, people, places }} />
                        })}
                    </Visits>
                    <ExtraDetails>
                        <div>View on map</div>
                        <div onClick={() => setShowModal(!showModal)}>Return to Countries</div>
                    </ExtraDetails>
                </Left>
                <Right country={country.trimmed} />
            </ModalInner>
        </StyledModal>
    )
}

export const CONNECTED_COUNTRY_INFORMATION = connect()(CountryInformation)
