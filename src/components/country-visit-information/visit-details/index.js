import React from 'react'
import styled, { keyframes } from 'styled-components'

import { KIERAN_GREY } from 'styles'

const Container = styled.div`
    background: ${KIERAN_GREY};
    border-radius: 5px;
    color: #fff;
    display: inline-block;
    font-size: ${({ option }) => (option === 'visitName' ? '25px ' : '12px ')};
    margin: 15px;
    margin-left: 0;
    padding: 10px;
    position: relative;
    outline: none;
    animation-iteration-count: infinite;
`

const Img = styled.img`
    position: absolute;
    right -5px;
    top: -5px;
`

const EditInput = styled.div`
    background: #ff5a5f;
    border: 1px solid #ff5a5f;
    border-radius: 5px;
    color: #fff;
    cursor: default;
    display: inline-block;
    font-size: ${({ option }) => (option === 'visitName' ? '25px ' : '12px ')};
    padding: 10px;
    margin: 15px;
    margin-left: 0;
    text-align: center;
    outline: none;
`

export const Visit = ({ changeDetails, index, inEditMode, option, placeholderText, value }) =>
    inEditMode ? (
        <Container
            placeholder={placeholderText}
            option={option}
            value={value}
            onClick={(e) => changeDetails(index, option)}
        >
            {value}
            {'  '}
            <Img src="/images/remove.svg" width="15" height="15" />
        </Container>
    ) : (
        <EditInput option={option}>{value}</EditInput>
    )
