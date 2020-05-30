import React from 'react'
import styled from 'styled-components'

import { FormErrors } from 'components/country-visited-modal/components/shared/form-errors'
import { Input } from 'components/country-visited-modal/components/shared/input'

const ImageContainer = styled.div`
    margin-left: 10px;
    margin-top: 10px;
    position: absolute;
    width: 25px;
    z-index: 1;

    & > img {
        width: 100%;
    }
`

export const VisitNameField = ({ setVisitName }) => (
    <div>
        <FormErrors category="visitName" errorMsg="You need to enter a name" />
        <ImageContainer>
            <img src="/images/memorable-name.svg" />
        </ImageContainer>
        <Input placeholder="Give the visit a memorable name" onChange={(e) => setVisitName(e.target.value)} />
    </div>
)
