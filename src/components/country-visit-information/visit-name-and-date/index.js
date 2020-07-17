import React from 'react'
import styled from 'styled-components'
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
    justify-content: flex-start;
    margin-top: 50px;

    & > img {
        border-radius: 15px;
        height: 20px;
        margin-left: 5px;
        width: 20px;
    }
`

const TripName = styled.input`
    background: transparent;
    border: none;
    color: #fff;
    font-size: 30px;
    outline: none;
    padding: 0;
`

const VisitName = styled.div`
    color: #fff;
    font-size: 30px;
`

const VisitDate = styled.div`
    color: #ccc;
    margin-top: 10px;
    margin-bottom: 5px;
`

const StyledDatePicker = styled(DatePicker)`
    .styledDatepicker > input {
        background: #red !important;
    }
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
                <TripName
                    placeholder={'Give the trip a memorable name'}
                    onChange={(e) => updateVisitDetailsStateHelper(e, 0, 'visitName')}
                    placeholder="Trip title goes here"
                    value={visitDetails.visitName}
                />
                <StyledDatePicker
                    className="styledDatepicker"
                    dateFormat="MMMM yyyy"
                    onChange={(date) => handleDate(date)}
                    selected={visitDetails.startDate ? new Date(visitDetails.startDate * 1000) : new Date()}
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
