import React from 'react'
import styled from 'styled-components'
import CreatableSelect from 'react-select/creatable'

import { FormErrors } from 'components/country-visited-modal/components/shared/form-errors'
import { customReactSelectStyles } from 'styles'

const CompanionImage = styled.img`
    margin-left: 11px;
    margin-top: 12px;
    position: absolute;
    width: 25px;
    z-index: 1;
`

export const CompanionsField = ({ handleChange }) => (
    <div>
        <FormErrors category="people" errorMsg="You need to say who you went with" />
        <CompanionImage src="/images/companion.svg" />
        <CreatableSelect
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
            placeholder="Who did you go with? (start typing to add person)"
            formatCreateLabel={(inputText) => `Add "${inputText}"`}
            noOptionsMessage={() => null}
            isMulti={true}
            onChange={handleChange}
            options={[]}
            styles={customReactSelectStyles}
        />
    </div>
)
