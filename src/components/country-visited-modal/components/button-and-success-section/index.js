import React from 'react'
import styled from 'styled-components'

const Button = styled.div`
    align-items: center;
    background: #323c46;
    color: #fff;
    cursor: pointer;
    border-radius: 8px;
    display: flex;
    height: 50px;
    justify-content: center;
`

const Image = styled.img`
    margin: auto;
    width: 30;
`

export const ButtonAndSuccessSection = ({ isLoading, submitCountryDetailsToBackend, success }) => (
    <div>
        <Button onClick={submitCountryDetailsToBackend}>Save</Button>
        <div>{success || null}</div>
        {isLoading ? <Image src="/images/loading.gif" /> : null}
    </div>
)
