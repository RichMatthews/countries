import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { CountryModal } from 'components/country-visited-modal'

const Container = styled.div`
    margin-top: 50px;
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
    text-align: center;
    width: 450px;
`

const Button = styled.div`
    background: #3baba4;
    color: #fff;
    cursor: pointer;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
`

export const Home = ({ options, user }) => {
    const [isModalOpen, setModalOpen] = useState(false)

    return (
        <Container>
            <Inner>
                <Heading>Remember every trip to every country</Heading>
                <Button onClick={() => setModalOpen(true)}>Add Trip</Button>
            </Inner>

            <CountryModal isModalOpen={isModalOpen} options={options} setModalOpen={setModalOpen} user={user} />
        </Container>
    )
}
