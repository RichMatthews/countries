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
        background-image: url(https://dl6ghv8ryvhmk.cloudfront.net/mobile-back.jpg);
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
    margin-bottom: 30px;
    opacity: 0.9;
    color: #fff;
    position: absolute;
    width: 450px;
    text-align: center;
    top: 180px;

    @media (max-width: 700px) {
        font-size: 32px;
        width: 300px;
    }
`

export const Home = () => (
    <Container>
        <Inner>
            <Heading>Remember every trip to every country</Heading>
        </Inner>
    </Container>
)
