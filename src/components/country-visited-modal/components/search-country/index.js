import React from 'react'
import Select from 'react-select'
import styled from 'styled-components'

import { FormErrors } from 'components/country-visited-modal/components/shared/form-errors'

const customStyles = {
    control: (base) => ({
        ...base,
        fontSize: 15,
        marginBottom: 20,
        minHeight: 50,
        paddingLeft: 30,
    }),
}

const WorldImage = styled.img`
    margin-left: 11px;
    margin-top: 13px;
    position: absolute;
    width: 25px;
    z-index: 100;
`

export const SearchCountryField = ({ options, setCountry }) => (
    <div>
        <FormErrors category="country" errorMsg="You need to enter a country" />
        <WorldImage src="/images/small-world.svg" />
        <Select
            maxMenuHeight={190}
            onChange={(country) => setCountry(country.value)}
            options={options}
            placeholder="Start typing to find a country..."
            styles={customStyles}
        />
    </div>
)
