import React, { useState } from 'react'
import styled from 'styled-components'
import { Observable, timer } from 'rxjs'
import { retryWhen, delayWhen } from 'rxjs/operators'
import Calendar from 'react-calendar'
import moment from 'moment'
import 'react-calendar/dist/Calendar.css'
import Select from 'react-select'

import { fadeIn, ReactModalAdapter } from 'components/react-modal-adapter'

const AddVisit = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`

const StyledCalendar = styled(Calendar)`
    position: absolute;
    top: 100px;
    z-index: 9;
`

const customStyles = {
    control: (base) => ({
        ...base,
        fontSize: 15,
        marginBottom: 20,
        minHeight: 50,
        paddingLeft: 30,
    }),
}

const Input = styled.input`
    border: none;
    border: solid 1px #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 15px;
    margin-bottom: 20px;
    padding: 15px;
    padding-left: 40px;
    width: 100%;
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

const Image = styled.img`
    margin-left: 8px;
    margin-top: 8px;
    position: absolute;
    width: 25px;
`

const TripImage = styled(Image)`
    margin-left: 10px;
    margin-top: 14px;
`

const CompanionImage = styled(Image)`
    margin-left: 11px;
    margin-top: 12px;
`
const CalendarImage = styled(Image)`
    margin-left: -5px;
    margin-top: -3px;
`

const WorldImage = styled(Image)`
    margin-top: 13px;
    z-index: 100;
`

const ModalContent = styled.div`
    margin: auto;
    width: 400px;
`

const ClosedIcon = styled.img`
    cursor: pointer;
    height: 13px;
    position: absolute;
    right: 20px;
    top: 20px;
    width: 13px;
`

const Button = styled.div`
    align-items: center;
    background: #3baba4;
    color: #fff;
    cursor: pointer;
    border-radius: 8px;
    display: flex;
    height: 50px;
    justify-content: center;
`

const FormError = styled.div`
    color: red;
`

const StyledModal = styled(ReactModalAdapter)`
    &__overlay {
        &.ReactModal__Overlay--before-close {
            transition: all 500ms ease-in-out;
            opacity: 0;
        }
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background: rgba(49, 49, 49, 0.9);
    }

    &__content {
        animation: ${fadeIn} 1s;
        position: absolute;
        top: 40px;
        left: 40px;
        right: 40px;
        bottom: 40px;
        border: none;
        background: #fff;
        overflow: auto;
        border-radius: 4px;
        outline: none;
        padding: 20px;
        height: 460px;
        margin: auto;
        width: 450px;
    }
`

export const CountryModal = ({ isModalOpen, options, restAPICountries, setModalOpen, user }) => {
    const [calendar, showCalendar] = useState(false)
    const [country, setCountry] = useState(null)
    const [date, setDate] = useState(null)
    const [formErrors, setFormErrors] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [people, setPeople] = useState(null)
    const [success, setSuccess] = useState(null)
    const [visitName, setVisitName] = useState(null)

    const setDateHelper = (date) => {
        const from = moment(date[0]).format('Do MMM YYYY')
        const to = moment(date[1]).format('Do MMM YYYY')
        setDate(`${from} - ${to}`)
        showCalendar(false)
    }

    const isFormValid = () => {
        const fields = [
            { name: 'country', stateName: country },
            { name: 'date', stateName: date },
            { name: 'people', stateName: people },
            { name: 'visitName', stateName: visitName },
        ]
        let newErrors = {}
        fields.forEach((field) => {
            if (!field.stateName) {
                newErrors = { ...newErrors, [field.name]: 'error' }
            }
        })
        setFormErrors(newErrors)
        return false
    }

    const submitCountryDetailsToBackend = async () => {
        if (!isFormValid()) {
            return
        }
        setLoading(true)
        const userID = user.uid
        const retrieveFlagAndContinent = restAPICountries.filter((ctry) => ctry.name === country)
        const flag = retrieveFlagAndContinent[0].flag
        const continent = retrieveFlagAndContinent[0].region
        const postHttpObservable = () => {
            return Observable.create((observer) => {
                fetch('https://eaq7kxyf7d.execute-api.us-east-1.amazonaws.com/countries/add-country', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ continent, country, date, flag, people, visitName, userID }),
                })
                    .then((res) => res.json())
                    .then((body) => {
                        observer.next(body)
                        observer.complete()
                    })
                    .catch((err) => observer.error(console.log(err)))
            })
        }

        const http$ = postHttpObservable()
        const submit = http$.pipe(retryWhen((errors) => errors.pipe(delayWhen(() => timer(2000)))))
        submit.subscribe((details) => setLoadingAndShowSuccessMessage(details))
    }

    const setLoadingAndShowSuccessMessage = (details) => {
        setLoading(false)
        setSuccess(details.message)
    }

    return (
        <StyledModal isOpen={isModalOpen} closeTimeoutMS={500} ariaHideApp={false}>
            <ModalContent>
                <ClosedIcon src="/images/cancel.svg" onClick={() => setModalOpen(false)} />
                <AddVisit>ADD A VISIT</AddVisit>
                <div>
                    <TripImage src="/images/trip-name.svg" />
                    {formErrors && formErrors.visitName ? <FormError>You need to enter a name</FormError> : null}
                </div>
                <Input placeholder="Give the visit a memorable name" onChange={(e) => setVisitName(e.target.value)} />
                {formErrors && formErrors.country ? <FormError>You need to enter a country</FormError> : null}
                <div>
                    <WorldImage src="/images/small-world.svg" />
                    <Select
                        maxMenuHeight={190}
                        onChange={(country) => setCountry(country.value)}
                        options={options}
                        placeholder="Start typing to find a country..."
                        styles={customStyles}
                    />
                </div>
                {formErrors && formErrors.date ? <FormError>You need to enter a date</FormError> : null}
                <DateComponent onClick={() => showCalendar(!calendar)} value={date}>
                    <CalendarImage src="/images/calendar.svg" />
                    <div>{date ? date : 'Select date'}</div>
                </DateComponent>
                {calendar ? (
                    <>
                        <StyledCalendar selectRange onChange={(date) => setDateHelper(date)} />
                    </>
                ) : null}

                {formErrors && formErrors.people ? <FormError>You need say who you went with</FormError> : null}
                <CompanionImage src="/images/companion.svg" />
                <Input placeholder="Who did you go with" onChange={(e) => setPeople(e.target.value)} />
                <Button onClick={submitCountryDetailsToBackend}>Save</Button>

                <div>{success || null}</div>
                {isLoading ? <Image src="/images/loading.gif" width="30" style={{ margin: 'auto' }} /> : null}
            </ModalContent>
        </StyledModal>
    )
}
