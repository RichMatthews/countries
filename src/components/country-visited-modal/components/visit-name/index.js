import React from 'react'
import styled from 'styled-components'

import { FormErrors } from 'components/country-visited-modal/components/shared/form-errors'
import { Input } from 'components/country-visited-modal/components/shared/input'

const TripImage = styled.img`
    margin-left: 10px;
    margin-top: 14px;
    position: absolute;
    width: 25px;
`

export const VisitNameField = ({ setVisitName }) => (
    <div>
        <FormErrors category="visitName" errorMsg="You need to enter a name" />
        <TripImage src="/images/trip-name.svg" />
        <Input placeholder="Give the visit a memorable name" onChange={(e) => setVisitName(e.target.value)} />
    </div>
)
