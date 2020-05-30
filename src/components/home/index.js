import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Instafeed from 'instafeed.js'

import { CONNECTED_CountryModal } from 'components/country-visited-modal'
import { KIERAN_GREY } from 'styles'

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

export const Home = ({ options, restAPICountries, user }) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [images, setImages] = useState([])

    useEffect(() => {
        getInstagramPhotos()
    }, [])

    const getInstagramPhotos = async () => {
        // const data = await fetch(
        // ).then((res) => res.json())
        // setImages(data.data)
    }

    return (
        <Container>
            <Inner>
                <Heading>Remember every trip to every country</Heading>
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
