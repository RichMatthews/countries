import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Observable, timer } from 'rxjs'
import { retryWhen, delayWhen } from 'rxjs/operators'
import styled from 'styled-components'
import moment from 'moment'

import { fadeIn, ReactModalAdapter } from 'components/react-modal-adapter'
import { ButtonAndSuccessSection } from 'components/country-visited-modal/components/button-and-success-section'
import { CalendarField } from 'components/country-visited-modal/components/calendar'
import { CompanionsField } from 'components/country-visited-modal/components/companions'
import { SearchCountryField } from 'components/country-visited-modal/components/search-country'
import { VisitNameField } from 'components/country-visited-modal/components/visit-name'
import { getRESTAPICountries } from 'redux/action-creators/countries/get-rest-api-countries'
import { addNewUserCountry } from 'redux/action-creators/user/add-new-user-visited-country'

const AddVisit = styled.div`
    color: #f0f0f0;
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
        background: #293039;
        overflow: auto;
        border-radius: 4px;
        outline: none;
        padding: 20px;
        height: 460px;
        margin: auto;
        width: 450px;
    }
`

export const CountryModal = ({ addNewUserCountry, countries, isModalOpen, restAPICountries, setModalOpen, user }) => {
    const [calendar, showCalendar] = useState(false)
    const [country, setCountry] = useState(null)
    const [date, setDate] = useState(null)
    const [formErrors, setFormErrors] = useState({})
    const [isLoading, setLoading] = useState(false)
    const [people, setPeople] = useState(null)
    const [success, setSuccess] = useState(null)
    const [timestamp, setTimestamp] = useState(null)
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
        getRESTAPICountries(restAPICountries)
    }, [restAPICountries])

    const calendarFormatter = (date) => {
        const fromTimestamp = moment(date[0]).unix()
        const ToTimestamp = moment(date[1]).unix()
        const from = moment(date[0]).format('Do MMM YYYY')
        const to = moment(date[1]).format('Do MMM YYYY')
        setDate(`${from} - ${to}`)
        setTimestamp([fromTimestamp, ToTimestamp])
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

    const submitCountryDetailsToBackend = () => {
        setLoading(true)
        const userId = user.details.uid
        const selectedCountryDetails = countries.restAPICountries.filter((ctry) => ctry.name === country)
        const flag = selectedCountryDetails[0].flag
        let continent = selectedCountryDetails[0].region
        const subregion = selectedCountryDetails[0].subregion

        if (continent === 'Americas') {
            if (subregion === 'South America') {
                continent = 'South America'
            } else {
                continent = 'North America'
            }
        }

        const serverData = {
            country: {
                continent,
                flag,
                name: country,
                visits: [
                    {
                        startDate: timestamp[0],
                        endDate: timestamp[0],
                        people,
                        visitName,
                    },
                ],
            },
            userId,
        }

        const data = JSON.stringify(serverData)

        const postHttpObservable = () => {
            return Observable.create((observer) => {
                fetch('https://eaq7kxyf7d.execute-api.us-east-1.amazonaws.com/countries/add-country', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: data,
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
        submit.subscribe((details) => setLoadingAndShowSuccessMessage(details, serverData.country))
    }

    const setLoadingAndShowSuccessMessage = (details, newCountry) => {
        setLoading(true)
        setModalOpen(false)
        addNewUserCountry(newCountry)
    }

    const sortArray = (newCountry) => {
        //     const newCountries = [...user.userVisitedCountries, newCountry]
        //     const sortedArray = sortBy([newCountries], 'name')
        //    return
    }

    return (
        <StyledModal isOpen={isModalOpen} closeTimeoutMS={500} ariaHideApp={false}>
            <ModalContent>
                <div>
                    <ClosedIcon src="/images/cancel.svg" onClick={() => setModalOpen(false)} />
                    <AddVisit>ADD A VISIT</AddVisit>
                </div>
                <VisitNameField setVisitName={setVisitName} />
                <SearchCountryField country={country} options={countries.selectOptions} setCountry={setCountry} />
                <CalendarField
                    calendar={calendar}
                    calendarFormatter={calendarFormatter}
                    date={date}
                    showCalendar={showCalendar}
                />
                <CompanionsField setPeople={setPeople} />
                <ButtonAndSuccessSection
                    isLoading={isLoading}
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
    addNewUserCountry,
    getRESTAPICountries,
}

export const CONNECTED_CountryModal = connect(mapState, mapDispatch)(CountryModal)
