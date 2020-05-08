import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Observable, timer } from 'rxjs'
import { retryWhen, delayWhen } from 'rxjs/operators'
import styled from 'styled-components'
import moment from 'moment'
import Select from 'react-select'
import { sortBy } from 'underscore'

import { fadeIn, ReactModalAdapter } from 'components/react-modal-adapter'
import { ButtonAndSuccessSection } from 'components/country-visited-modal/components/button-and-success-section'
import { CalendarField } from 'components/country-visited-modal/components/calendar'
import { CompanionsField } from 'components/country-visited-modal/components/companions'
import { SearchCountryField } from 'components/country-visited-modal/components/search-country'
import { VisitNameField } from 'components/country-visited-modal/components/visit-name'
import { setRESTAPICountries } from 'redux/action-creators/countries/set-rest-api-countries'
import { createHttpObservable } from 'utils/'

const AddVisit = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
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

export const CountryModal = ({
    countries,
    isModalOpen,
    options,
    restAPICountries,
    setModalOpen,
    setUserVisitedCountries,
    userVisitedCountries,
    user,
}) => {
    const [calendar, showCalendar] = useState(false)
    const [country, setCountry] = useState(null)
    const [date, setDate] = useState(null)
    const [formErrors, setFormErrors] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [people, setPeople] = useState(null)
    const [success, setSuccess] = useState(null)
    const [visitName, setVisitName] = useState(null)

    const usePrevious = (value) => {
        const ref = useRef()
        useEffect(() => {
            ref.current = value
        })
        return ref.current
    }

    const prevAmount = usePrevious(formErrors)

    useEffect(() => {
        setRESTAPICountries(restAPICountries)
    }, [restAPICountries])

    const calendarFormatter = (date) => {
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
            } else {
                newErrors = { ...newErrors, [field.name]: '' }
            }
        })
        setFormErrors(newErrors)
        return false
    }

    const submitCountryDetailsToBackend = async () => {
        setLoading(true)
        const userID = user.uid
        const selectedCountryDetails = countries.restAPICountries.filter((ctry) => ctry.name === country)
        const flag = selectedCountryDetails[0].flag
        const continent = selectedCountryDetails[0].region

        const newCountry = {
            continent,
            name: country,
            date,
            flag,
            people,
            visitName,
            userID,
        }
        const postHttpObservable = (newCountry) => {
            return Observable.create((observer) => {
                fetch('https://eaq7kxyf7d.execute-api.us-east-1.amazonaws.com/countries/add-country', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...newCountry }),
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
        submit.subscribe((details) => setLoadingAndShowSuccessMessage(details, newCountry))
    }

    const setLoadingAndShowSuccessMessage = (details, newCountry) => {
        setLoading(false)
        setSuccess(details.message)
        setModalOpen(false)
        setUserVisitedCountries(sortArray(newCountry))
    }

    const sortArray = (newCountry) => {
        const newCountries = [...userVisitedCountries, newCountry]
        // const sortedArray = sortBy([newCountries], 'name')
        setUserVisitedCountries(newCountries)
    }

    return (
        <StyledModal isOpen={isModalOpen} closeTimeoutMS={500} ariaHideApp={false}>
            <ModalContent>
                <div>
                    <ClosedIcon src="/images/cancel.svg" onClick={() => setModalOpen(false)} />
                    <AddVisit>ADD A VISIT</AddVisit>
                </div>
                <VisitNameField setVisitName={setVisitName} />
                <SearchCountryField options={countries.selectOptions} setCountry={setCountry} />
                <CalendarField />
                <CompanionsField setPeope={setPeople} />
                <ButtonAndSuccessSection
                    submitCountryDetailsToBackend={submitCountryDetailsToBackend}
                    success={success}
                />
            </ModalContent>
        </StyledModal>
    )
}

const mapState = ({ countries, user }) => ({
    countries,
    user,
})

const mapDispatch = {
    setRESTAPICountries,
}

export const CONNECTED_CountryModal = connect(mapState, mapDispatch)(CountryModal)
