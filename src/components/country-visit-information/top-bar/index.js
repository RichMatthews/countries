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
    top: 0;
    width: 100%;
    z-index: 999;

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

export const TopBar = ({ history, inEditMode, setEditMode, updateTripDetailsHelper, userPersonalDetails }) => {
    const createShareLink = () => {
        const createdLink = window.location.origin + '/' + userPersonalDetails.uid + window.location.pathname
        alert(createdLink)
    }

    return (
        <Container>
            <img onClick={() => history.push('/visited')} src="/images/back-arrow.svg" height="30" width="30" alt="" />
            <div>
                {inEditMode ? (
                    <span onClick={updateTripDetailsHelper}>Save</span>
                ) : (
                    <span>
                        <img
                            src="/images/share.svg"
                            height="30"
                            width="30"
                            alt=""
                            onClick={() => createShareLink()}
                            style={{ marginRight: '20px' }}
                        />
                        <img src="/images/edit.svg" height="30" width="30" alt="" onClick={() => setEditMode(true)} />
                    </span>
                )}
            </div>
        </Container>
    )
}
