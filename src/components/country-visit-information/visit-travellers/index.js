import React from 'react'
import styled from 'styled-components'

const RemoveTraveller = styled.div`
    background: #eb4d42;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
    padding: 5px;
    margin-top: 5px;
`

const Traveller = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    & > img {
        border-radius: 60px;
        height: 60px;
        margin-bottom: 10px;
        width: 60px;
    }
`

const Travellers = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 10px 0;
    overflow-x: scroll;
`

export const VisitTravellers = ({ inEditMode, removeTraveller, travellers }) => (
    <Travellers>
        {travellers &&
            travellers.map((traveller) => (
                <Traveller>
                    {traveller.photo ? (
                        <img src={traveller.photo} alt="" />
                    ) : (
                        <img src={'/images/person-placeholder.svg'} alt="" />
                    )}
                    <div>{traveller.name ? traveller.name.split(' ')[0] : traveller}</div>
                    {inEditMode && (
                        <RemoveTraveller onClick={() => removeTraveller(traveller.name)}>Remove</RemoveTraveller>
                    )}
                </Traveller>
            ))}
    </Travellers>
)
