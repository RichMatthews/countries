import React from 'react'
import styled from 'styled-components'

import { FormErrors } from 'components/country-visited-modal/components/shared/form-errors'
import { Input } from 'components/country-visited-modal/components/shared/input'

const CompanionImage = styled.img`
    margin-left: 11px;
    margin-top: 12px;
    position: absolute;
    width: 25px;
`

export const CompanionsField = ({ setPeople }) => (
    <div>
        <FormErrors category="people" errorMsg="You need to say who you went with" />
        <CompanionImage src="/images/companion.svg" />
        <Input placeholder="Who did you go with" onChange={(e) => setPeople(e.target.value)} />
    </div>
)
