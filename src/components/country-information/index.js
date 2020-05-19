import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { ReactModalAdapter, fadeIn } from 'components/react-modal-adapter'
import { KIERAN_GREY } from 'styles'

const ModalInner = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
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
`

const Visit = styled.div`
    align-items: center;
    background: #fff;
    color: ${KIERAN_GREY};
    display: flex;
    flex-direction: column;
    font-size: 26px;
    border-bottom: 1px solid #ccc;
    width: 80%;
    margin: auto;
    margin-top: 25px;
    padding-bottom: 25px;

    & div:first-child {
        padding-bottom: 10px;
    }
`

const Image = styled.img`
    width: 55px;
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

const Dates = styled.div`
    color: #ccc;
    font-size: 15px;
`

const Travellers = styled.div`
    font-size: 14px;
`

const Left = styled.div`
    width: 33%;
`

const Right = styled.div`
    background-image: ${({ country }) => `url(/images/countries/${country}.jpg)`};
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 67%;
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
                <Left>
                    <CountryHeading>{country.name}</CountryHeading>
                    {country.visits.map((visit) => (
                        <Visit>
                            <div>{visit.visitName}</div>
                            <Dates>
                                <div>
                                    {moment.unix(visit.startDate).format('Do MMM')} -{' '}
                                    {moment.unix(visit.endDate).format('Do MMM YYYY')}
                                </div>
                            </Dates>
                            <Travellers>You went with {visit.people} </Travellers>
                        </Visit>
                    ))}
                </Left>
                <Right country={country.trimmed} />
            </ModalInner>
        </StyledModal>
    )
}

//<Close onClick={() => setShowModal(!showModal)}>Return to Countries</Close>
//                          <Ticket>
// <Image src={'/images/ticket.svg'} />
//</Ticket>
