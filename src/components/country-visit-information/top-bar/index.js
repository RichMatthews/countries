import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 23px;
    opacity: 0.75;
    position: fixed;
    width: 100%;
    z-index: 999;

    @media (min-width: 700px) {
        left: 25%;
        margin: auto;
        width: 50%;
    }

    & > div {
        align-items: center;
        display: flex;
        height: 30px;
        padding: 15px;
    }

    & > img {
        padding: 15px;
    }
`

const EditModeWarning = styled.div`
    color: red;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    width: 250px;
`

export const TopBar = ({ history, inEditMode, setEditMode, updateTripDetailsHelper }) => (
    <Container>
        <img onClick={() => history.push('/visited')} src="/images/back-arrow.svg" height="30" width="30" alt="" />
        {inEditMode ? (
            <EditModeWarning>You are in edit mode. Click SAVE once you've made changes.</EditModeWarning>
        ) : null}

        <div>
            {inEditMode ? (
                <span onClick={updateTripDetailsHelper}>Save</span>
            ) : (
                <span onClick={() => setEditMode(true)}>
                    <img src="/images/edit.svg" height="30" width="30" alt="" />
                </span>
            )}
        </div>
    </Container>
)
