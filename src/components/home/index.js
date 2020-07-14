import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    background-image: url(https://dl6ghv8ryvhmk.cloudfront.net/maldives-background.jpg);
    background-size: cover;
    height: 100%;
    position: absolute;
    width: 100%;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(to bottom right, #000, #fff);
        opacity: 0.2;
    }

    @media (max-width: 700px) {
        background-image: url(/images/mobile-bg.jpg);
    }
`

const Inner = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Heading = styled.div`
    font-size: 48px;
    color: #fff;
    position: absolute;
    text-align: left;
    top: 180px;

    @media (max-width: 700px) {
        font-size: 32px;
        width: 300px;
    }
`

const Add = styled.div`
    background: #fff;
    border-radius: 20px;
    bottom: 50px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
    font-size: 22px;
    font-weight: bold;
    padding: 15px;
    position: absolute;
    text-align: center;
    width: 80vw;
`

export const Home = () => (
    <Container>
        <Inner>
            <Heading>REMEMBER EVERY TRIP</Heading>
            <Add>ADD TRIP</Add>
        </Inner>
    </Container>
)
