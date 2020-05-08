import React from 'react'
import styled from 'styled-components'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import { FormErrors } from 'components/country-visited-modal/components/shared/form-errors'

const CalendarImage = styled.img`
    margin-left: -5px;
    margin-top: -3px;
    position: absolute;
    width: 25px;
`

const DateComponent = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #757575;
    font-size: 15px;
    margin-bottom: 20px;
    padding: 15px;

    & > div {
        padding-left: 25px;
    }
`

const StyledCalendar = styled(Calendar)`
    position: absolute;
    top: 100px;
    z-index: 9;
`

export const CalendarField = ({ calendar, calendarFormatter, date, showCalendar }) => (
    <div>
        <FormErrors category="visitName" errorMsg="You need to enter a name" />
        <DateComponent onClick={() => showCalendar(!calendar)} value={date}>
            <CalendarImage src="/images/calendar.svg" />
            <div>{date ? date : 'Select date'}</div>
        </DateComponent>
        {calendar ? <StyledCalendar selectRange onChange={(date) => calendarFormatter(date)} /> : null}
    </div>
)
