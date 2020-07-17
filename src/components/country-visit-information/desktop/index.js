import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    & > div {
        border: 1px solid black;
        margin: 5px;
        height: 400px;
        width: 40%;
    }
`

export const CountryVisitInformationDesktopView = () => {
    return (
        <Container>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
        </Container>
    )
}
