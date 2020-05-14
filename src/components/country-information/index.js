import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { ReactModalAdapter, fadeIn } from 'components/react-modal-adapter'
import { KIERAN_GREY } from 'styles'

const ModalInner = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
`

const CountryHeading = styled.h3`
    color: #323c46;
    margin: 0;
    font-style: normal;
    font-weight: 900;
    font-size: 48px;
    line-height: 60px;
    text-transform: uppercase;
    text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
`

const Close = styled.div`
    position: absolute;
    right: 25px;
    cursor: pointer;
`

const Visit = styled.div`
    border-radius: 6px;
    box-shadow: 0 1px 4px rgba(41, 51, 57, 0.5);
    color: ${KIERAN_GREY};
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    margin-top: 5px;
    padding: 5px;

    & div:first-child {
        display: flex;
        padding: 5px;
        padding-bottom: 20px;
        justify-content: space-between;
        align-items: center;
        & div:first-child {
            font-size: 35px;
        }
    }
`

const CloseImage = styled.img`
    width: 55px;
`

const CountryNameAndVisitTotalCombined = styled.div`
    align-items: center;
    border-bottom: 1px solid ${KIERAN_GREY};
    display: flex;
    padding: 10px;
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
        overflow: auto;
        border-radius: 4px;
        outline: none;
        padding: 0;
        height: 550px;
        margin: auto;
        width: 800px;
    }
`

export const CountryInformation = ({ country, setShowModal, showModal }) => {
    return (
        <StyledModal isOpen={showModal} closeTimeoutMS={500} ariaHideApp={false}>
            <ModalInner>
                <div>
                    <CountryNameAndVisitTotalCombined>
                        <CountryHeading>{country.name}</CountryHeading>
                        <Close onClick={() => setShowModal(!showModal)}>
                            <CloseImage src={'/images/ticket.svg'} />
                        </Close>
                    </CountryNameAndVisitTotalCombined>
                    {country.visits.map((visit) => (
                        <Visit>
                            <div>
                                <div>{visit.visitName}</div>
                                <div>
                                    {moment.unix(visit.startDate).format('Do MMM YYYY')} -{' '}
                                    {moment.unix(visit.endDate).format('Do MMM YYYY')}
                                </div>
                            </div>
                            <div></div>
                            <div>You went with {visit.people} </div>
                        </Visit>
                    ))}
                </div>
                <div></div>
            </ModalInner>
        </StyledModal>
    )
}
