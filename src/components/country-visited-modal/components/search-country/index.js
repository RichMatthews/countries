import React from 'react'
import Select from 'react-select'
import styled from 'styled-components'

import { FormErrors } from 'components/country-visited-modal/components/shared/form-errors'
import { KIERAN_GREY } from 'styles'

const customStyles = {
    control: (base, state) => ({
        ...base,
        background: '#ccc',
        color: KIERAN_GREY,
        fontSize: 15,
        marginBottom: 20,
        minHeight: 50,
        paddingLeft: state.selectProps.country ? 0 : 30,
    }),
    option: (base, state) => ({
        ...base,

        color: 'red',
        padding: 10,
        '&:hover': {
            color: 'green',
        },
    }),
    menuList: (base) => ({
        ...base,
        color: KIERAN_GREY,
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
        <img src={flag} style={{ marginRight: '10px', width: 30 }} alt="" />
        <div style={{ color: KIERAN_GREY }}>{label}</div>
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
