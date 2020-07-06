import React from 'react'
import styled from 'styled-components'
import AutosizeInput from 'react-input-autosize'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import { KIERAN_GREY } from 'styles'

const AddNewButton = styled.div`
    background: ${KIERAN_GREY};
    border: 1px solid #ccc;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    padding: 12px;
    margin: auto;
    width: 100px;
`

const Author = styled.div`
    align-items: center;
    display: flex;
    font-style: italic;
    justify-content: center;

    & > img {
        border-radius: 15px;
        height: 20px;
        margin-left: 5px;
        width: 20px;
    }
`

const StyledAutoSizeInput = styled(AutosizeInput)`
    & > input {
        border: 1px solid #ff5a5f !important;
        border-radius: 5px !important;
        font-size: ${({ fontSize }) => fontSize} !important;
        margin: 15px; !important;
        padding: 10px !important;
        outline: none !important;
    }
`

const VisitName = styled.div`
    color: ${KIERAN_GREY};
    font-size: 32px;
    font-style: italic;
    font-weight: bold;
`

const VisitDate = styled.div`
    color: #ccc;
    margin-top: 10px;
    margin-bottom: 5px;
`

export const VisitNameAndDate = ({
    handleDate,
    inEditMode,
    setEditMode,
    visitDetails,
    updateVisitDetailsStateHelper,
    userPersonalDetails,
}) => {
    const isVisitNameAndDate = visitDetails && visitDetails.visitName && visitDetails.startDate
    if (inEditMode) {
        return (
            <>
                <StyledAutoSizeInput
                    fontSize="20px"
                    placeholder={'Give the trip a memorable name'}
                    value={visitDetails.visitName}
                    onChange={(e) => updateVisitDetailsStateHelper(e, 0, 'visitName')}
                />
                <DatePicker
                    selected={visitDetails.startDate ? new Date(visitDetails.startDate * 1000) : new Date()}
                    onChange={(date) => handleDate(date)}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    showFullMonthYearPicker
                />
            </>
        )
    } else if (isVisitNameAndDate && !inEditMode) {
        return (
            <>
                <VisitName>{visitDetails.visitName}</VisitName>
                <VisitDate>{moment.unix(visitDetails.startDate).format('MMM YYYY')}</VisitDate>
                <Author>
                    <div>By {userPersonalDetails.displayName}</div>{' '}
                    <img src={userPersonalDetails.profilePhoto} alt="" />
                </Author>
            </>
        )
    } else {
        return <AddNewButton onClick={() => setEditMode(true)}>Tap here to create a trip</AddNewButton>
    }
}
