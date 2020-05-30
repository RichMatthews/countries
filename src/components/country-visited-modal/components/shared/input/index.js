import styled from 'styled-components'

import { KIERAN_GREY } from 'styles'

export const Input = styled.input`
    border: none;
    border: solid 1px #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    color: ${KIERAN_GREY};
    font-size: 15px;
    margin-bottom: 20px;
    padding: 13px;
    padding-left: 40px;
    width: 100%;

    ::placeholder {
        color: #9393a8;
    }
`
