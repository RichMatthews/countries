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
    color: #323c46;
    margin: 0;
    font-style: normal;
    font-weight: 900;
    font-size: 32px;
    line-height: 60px;
    text-align: center;
`

const Ticket = styled.div`
    cursor: pointer;
`

const Visit = styled.div`
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 1px 4px rgba(41, 51, 57, 0.5);
    color: ${KIERAN_GREY};
    display: flex;
    flex-direction: row;
    margin: 15px;

    & div:first-child {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & div:first-child {
            font-size: 20px;
        }
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

const VisitNameAndDate = styled.div`
    display: flex;
    font-size: 20px;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin-left: 10px;
    padding: 5px;

    & > div {
        width: 100%;
    }
`

const Dates = styled.div`
    font-size: 10px;
`

const Travellers = styled.div`
    font-size: 12px;
`

const Left = styled.div`
    width: 33%;
`

const Right = styled.div`
    background-image: ${({ country }) => `url(/images/countries/${country.name.toLowerCase()}.jpg)`};
    background-repeat: no-repeat;
    background-size: 1000px;
    height: 100%;
    width: 67%;
`

const Marker = styled.div`
    background: #ccf;
    height: 75px;
    width: 30px;
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
                            <Marker />

                            <VisitNameAndDate>
                                <div>
                                    <div>{visit.visitName}</div>
                                    <Dates>
                                        {moment.unix(visit.startDate).format('Do MMM')} -{' '}
                                        {moment.unix(visit.endDate).format('Do MMM YYYY')}
                                    </Dates>
                                </div>
                                <Travellers>You went with {visit.people} </Travellers>
                            </VisitNameAndDate>
                        </Visit>
                    ))}
                </Left>
                <Right country={country} />
            </ModalInner>
        </StyledModal>
    )
}

//<Close onClick={() => setShowModal(!showModal)}>Return to Countries</Close>
//                          <Ticket>
// <Image src={'/images/ticket.svg'} />
//</Ticket>
