import React from 'react'
import styled from 'styled-components'
import CreatableSelect from 'react-select/creatable'

import { FormErrors } from 'components/country-visited-modal/components/shared/form-errors'
import { customReactSelectStyles } from 'styles'

const MemorablePlaceImage = styled.img`
    margin-left: 10px;
    margin-top: 9px;
    position: absolute;
    width: 25px;
    z-index: 1;
`

export const MemorablePlaces = ({ handleChange }) => (
    <div>
        <FormErrors category="people" errorMsg="You need to say who you went with" />
        <MemorablePlaceImage src="/images/worldwide.svg" />
        <CreatableSelect
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
            placeholder="Add some memorable places you visited"
            noOptionsMessage={() => null}
            isMulti={true}
            onChange={handleChange}
            options={[]}
            styles={customReactSelectStyles}
        />
    </div>
)
