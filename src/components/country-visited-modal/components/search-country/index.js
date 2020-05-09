import React from 'react'
import Select from 'react-select'
import styled from 'styled-components'

import { FormErrors } from 'components/country-visited-modal/components/shared/form-errors'

const customStyles = {
    control: (base, state) => ({
        ...base,
        background: '#323C46',
        color: '#ccc',
        fontSize: 15,
        marginBottom: 20,
        minHeight: 50,
        paddingLeft: state.selectProps.country ? 0 : 30,
    }),
    menuList: (base) => ({
        ...base,
        background: '#323C46',
        color: '#ccc',
        padding: 0,
    }),
}

const WorldImage = styled.img`
    margin-left: 11px;
    margin-top: 13px;
    position: absolute;
    width: 25px;
    z-index: 100;
`

const Option = styled.div`
    display: flex;
    padding: 0;
    &:hover {
        color: black;
    }
`

const formatOptionLabel = ({ value, label, flag }) => (
    <Option>
        <img src={flag} style={{ marginRight: '10px', width: 30 }} />
        <div style={{ color: '#ccc' }}>{label}</div>
    </Option>
)

export const SearchCountryField = ({ country, options, setCountry }) => (
    <div>
        <FormErrors category="country" errorMsg="You need to enter a country" />
        {country ? null : <WorldImage src="/images/small-world.svg" />}
        <Select
            country={country}
            formatOptionLabel={formatOptionLabel}
            maxMenuHeight={190}
            onChange={(country) => setCountry(country.value)}
            options={options}
            placeholder="Start typing to find a country..."
            styles={customStyles}
        />
    </div>
)
