import React, { useLayoutEffect, useState } from 'react'
import styled from 'styled-components'

import { CONNECTED_CountryModal } from 'components/country-visited-modal'
import { KIERAN_GREY } from 'styles'

const Container = styled.div`
    background-image: url(https://dl6ghv8ryvhmk.cloudfront.net/beach.jpg);
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
    border-radius: 8px;
    padding: 10px;
    position: absolute;
    top: 350px;
    text-align: center;
`

const SVG = styled.svg`
    position: absolute;
    height: 650px;
    top: 40px;
    z-index: -1000;
`

export const Home = ({ options, restAPICountries, user }) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [array, setArray] = useState(['', 24, 6, 4, 1, 19, 27, 29, 40, 45, 56, 64, 70, 73, 74])
    // useLayoutEffect(() => {
    //     const interval = setInterval(() => {
    //         if (array.length > 1) {
    //             setArray(array.shift())
    //             addAnimation()
    //         }
    //     }, 1500)
    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [])

    const addAnimation = () => {
        const svg = document.querySelector('svg')
        let anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
        anim.setAttribute('begin', 'indefinite')
        anim.setAttribute('from', '#F2F4F9')
        anim.setAttribute('to', '#125c23')
        // anim.setAttribute('values', '#F2F4F9;#125c23;')
        anim.setAttribute('dur', '0.25s')
        anim.setAttribute('repeatCount', '1')
        anim.setAttribute('attributeName', 'fill')
        anim.setAttribute('fill', 'freeze')

        svg.children[array[0]].appendChild(anim)
        // svg.children[count + 1].appendChild(anim)
        // svg.children[count + 2].appendChild(anim)
        anim.beginElement()
    }

    return (
        <Container>
            <Inner>
                <Heading>Remember every trip to every country</Heading>
                <Button onClick={() => setModalOpen(true)}>Add Trip</Button>
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
