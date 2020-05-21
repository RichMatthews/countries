import React from 'react'
import styled from 'styled-components'

import { KIERAN_GREY } from 'styles'

const Button = styled.div`
    align-items: center;
    background: ${KIERAN_GREY};
    color: #fff;
    cursor: pointer;
    border-radius: 8px;
    display: flex;
    height: 50px;
    justify-content: center;
`

const Image = styled.img`
    margin: auto;
    width: 30px;
`

export const ButtonAndSuccessSection = ({ isLoading, submitCountryDetailsToBackend, success }) => {
    return (
        <div>
            <Button onClick={submitCountryDetailsToBackend}>
                {isLoading ? <Image src="/images/loading.gif" /> : 'Save Trip'}
            </Button>
            <div>{success || null}</div>
        </div>
    )
}
