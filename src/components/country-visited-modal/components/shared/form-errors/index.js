import React from 'react'
import styled from 'styled-components'

const FormError = styled.div`
    color: red;
`
export const FormErrors = (category, errorMsg, formErrors) =>
    formErrors && formErrors[category] ? <FormError>{errorMsg}</FormError> : null
