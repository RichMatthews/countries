import React from 'react'
import styled from 'styled-components'

import { ReactModalAdapter, fadeIn } from 'components/react-modal-adapter'

const Bottom = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5px;
    height: 100%;
`

const ModalInner = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const CountryHeading = styled.h3`
    color: white;
    font-size: 48px;
    display: flex;
    align-items: center;
    margin: 0;
    text-align: center;
`

const Top = styled.div`
    align-items: center;
    background: url(/images/beach.jpg) center no-repeat;
    background-size: 800px;
    display: flex;
    justify-content: center;
    height: 400px;
`

const Close = styled.div`
    position: absolute;
    right: 25px;
    cursor: pointer;
`

const Visit = styled.div`
    background: #55aac2;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    padding: 10px;
    width: 80%;
`

const Image = styled.img`
    border-radius: 50%;
    height: 60px;
    width: 60px;
`

const CloseImage = styled.img`
    position: absolute;
    top: -65px;
    right: 0;
    width: 15px;
`

const CountryNameAndVisitTotalCombined = styled.div`
    & > p {
        color: #fff;
        font-size: 24px;
        margin: 0;
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
                <Top>
                    <Image src={country.flag} />
                    <CountryNameAndVisitTotalCombined>
                        <CountryHeading>{country.name}</CountryHeading>
                        <p>You've visited {country.visits.length} times</p>
                    </CountryNameAndVisitTotalCombined>
                    <Close onClick={() => setShowModal(!showModal)}>
                        <CloseImage src={'/images/close.svg'} />
                    </Close>
                </Top>
                <Bottom>
                    {country.visits.map((visit) => (
                        <Visit key={visit.visitName}>
                            <div>{visit.visitName}</div>
                            <div>
                                {visit.startDate} - {visit.endDate}
                            </div>
                            <div>You went with some people</div>
                        </Visit>
                    ))}
                </Bottom>
            </ModalInner>
        </StyledModal>
    )
}
