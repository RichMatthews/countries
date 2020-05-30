import React from 'react'
import styled from 'styled-components'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import 'react-calendar/dist/Calendar.css'

import { FormErrors } from 'components/country-visited-modal/components/shared/form-errors'

const CalendarImage = styled.img`
    margin-left: 8px;
    margin-top: 11px;
    position: absolute;
    width: 25px;
    z-index: 1;
`

const CalendarImageRight = styled(CalendarImage)`
    margin-left: 163px;
`

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    .SingleDatePicker {
        width: 38%;
    }
    .SingleDatePicker_picker {
        z-index: 999;
    }
    .SingleDatePickerInput {
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        height: 46px;
        overflow: hidden;
        width: 100%;
    }
    .DateInput {
        background: transparent;
        font-size: 15px;
        padding-left: 25px;
        width: 100%;
    }
    .DateInput_input {
        color: #9393a8;
        font-size: 15px;
        background: transparent;
    }
`

const MonthViewSwitch = styled.div`
    font-size: 13px;
    width: 55px;
`

export const CalendarField = ({
    endDate,
    endDateFocused,
    onDatesChange,
    startDate,
    setEndDateFocused,
    setStartDateFocused,
    startDateFocused,
}) => (
    <div>
        <FormErrors category="visitName" errorMsg="You need to enter a name" />
        <CalendarImage src="/images/calendar.svg" />
        <CalendarImageRight src="/images/calendar.svg" />
        <StyledWrapper>
            <SingleDatePicker
                date={startDate}
                onDateChange={onDatesChange}
                displayFormat={() => 'Do MMM YYYY'}
                focused={startDateFocused}
                numberOfMonths={1}
                isOutsideRange={() => null}
                hideKeyboardShortcutsPanel={true}
                onFocusChange={({ focused }) => setStartDateFocused(focused)}
                id="startDate"
            />

            <SingleDatePicker
                date={endDate}
                onDateChange={onDatesChange}
                displayFormat={() => 'Do MMM YYYY'}
                focused={endDateFocused}
                numberOfMonths={1}
                isOutsideRange={() => null}
                hideKeyboardShortcutsPanel={true}
                onFocusChange={({ focused }) => setEndDateFocused(focused)}
                id="endDate"
            />
            <MonthViewSwitch>hu</MonthViewSwitch>
        </StyledWrapper>
    </div>
)
