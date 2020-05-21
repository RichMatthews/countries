import React, { useState } from 'react'
import styled from 'styled-components'

import { CONNECTED_CountryModal } from 'components/country-visited-modal'
import { KIERAN_GREY } from 'styles'

const Container = styled.div`
    background-image: url(https://dl6ghv8ryvhmk.cloudfront.net/maldives2.webp);
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
    top: 270px;
`

const Button = styled.div`
    background: ${KIERAN_GREY};
    color: #fff;
    cursor: pointer;
    border-radius: 3px;
    padding: 10px;
    position: absolute;
    top: 425px;
    text-align: center;
`

export const Home = ({ options, restAPICountries, user }) => {
    const [isModalOpen, setModalOpen] = useState(false)

    return (
        <Container>
            <Inner>
                <Heading>Remember every trip to every country</Heading>
                {/* <Button onClick={() => setModalOpen(true)}>Add Trip</Button> */}
            </Inner>

            <CONNECTED_CountryModal
                isModalOpen={isModalOpen}
                options={options}
                restAPICountries={restAPICountries}
                setModalOpen={setModalOpen}
                user={user}
            />
        </Container>
    )
}
