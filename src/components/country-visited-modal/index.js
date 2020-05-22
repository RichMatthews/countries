import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Observable, timer } from 'rxjs'
import { retryWhen, delayWhen } from 'rxjs/operators'
import styled from 'styled-components'
import moment from 'moment'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

import { fadeIn, ReactModalAdapter } from 'components/react-modal-adapter'
import { ButtonAndSuccessSection } from 'components/country-visited-modal/components/button-and-success-section'
import { CalendarField } from 'components/country-visited-modal/components/calendar'
import { CompanionsField } from 'components/country-visited-modal/components/companions'
import { SearchCountryField } from 'components/country-visited-modal/components/search-country'
import { VisitNameField } from 'components/country-visited-modal/components/visit-name'
import { getRESTAPICountries } from 'redux/action-creators/countries/get-rest-api-countries'
import { addNewUserCountry } from 'redux/action-creators/user/add-new-user-visited-country'
import { KIERAN_GREY } from 'styles'

const AddVisit = styled.div`
    color: ${KIERAN_GREY};
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
        height: 450px;
        margin: auto;
        width: 450px;
    }
`

const EmojiSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #ccc;
    border-radius: 4px;
    height: 50px;
    margin-bottom: 20px;
    padding: 0 20px 0 15px;

    & > div {
        display: flex;
        alignitems: scenter;

        & > span {
            color: #757575;
            marginright: 10px;
        }
    }
`

export const CountryModal = ({ addNewUserCountry, countries, isModalOpen, restAPICountries, setModalOpen, user }) => {
    const [calendar, showCalendar] = useState(false)
    const [country, setCountry] = useState(null)
    const [date, setDate] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [people, setPeople] = useState(null)
    const [success, setSuccess] = useState(null)
    const [timestamp, setTimestamp] = useState(null)
    const [visitName, setVisitName] = useState(null)
    const [chosenEmoji, setChosenEmoji] = useState(null)
    const [showPicker, setShowPicker] = useState(false)

    const onEmojiClick = (emojiObject) => {
        setChosenEmoji(emojiObject.native)
        setShowPicker(false)
    }

    useEffect(() => {
        getRESTAPICountries(restAPICountries)
    }, [restAPICountries])

    const calendarFormatter = (date) => {
        const fromTimestamp = moment(date[0]).unix()
        const toTimestamp = moment(date[1]).unix()
        const from = moment(date[0]).format('Do MMM YYYY')
        const to = moment(date[1]).format('Do MMM YYYY')
        setDate(`${from} - ${to}`)
        setTimestamp([fromTimestamp, toTimestamp])
        showCalendar(false)
    }

    const countryNameConverter = (country) => {
        if (country.toLowerCase().includes('america')) {
            return 'United States'
        }
        if (country.toLowerCase().includes('britain')) {
            return 'United Kingdom'
        }
        if (country.toLowerCase().includes('bolivia')) {
            return 'Bolivia'
        }
        if (country.toLowerCase().includes('russia')) {
            return 'Russia'
        }
        if (country.toLowerCase().includes('islamic')) {
            return 'Iran'
        }
        if (country.toLowerCase().includes('macedonia')) {
            return 'Macedonia'
        }
        if (country.toLowerCase().includes('viet nam')) {
            return 'Vietnam'
        }
        if (country.toLowerCase().includes('moldova')) {
            return 'Moldova'
        }
        if (country.toLowerCase().includes('korea (D')) {
            return 'North Korea'
        }
        if (country.toLowerCase().includes('venezuela')) {
            return 'Venezuela'
        }

        return country
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

        const convertedName = countryNameConverter(country)

        const serverData = {
            country: {
                continent,
                flag,
                name: convertedName,
                trimmed: convertedName.toLowerCase().replace(/ /g, ''),
                visits: [
                    {
                        startDate: timestamp[0],
                        endDate: timestamp[1],
                        people,
                        visitName: visitName + ' ' + chosenEmoji,
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

        setTimeout(() => {
            setDate(null)
            setLoading(false)
            setChosenEmoji(null)
        }, 1000)
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
                {showPicker ? (
                    <Picker
                        onSelect={onEmojiClick}
                        style={{ position: 'absolute', bottom: '20px', cursor: 'pointer', right: '20px' }}
                    />
                ) : null}
                <EmojiSection>
                    <div>
                        <span>{!chosenEmoji ? 'Select an emoji to sum up your trip!' : null}</span>
                        <span style={{ fontSize: '25px' }}>{chosenEmoji ? chosenEmoji : null} </span>
                    </div>
                    <img src={'/images/emojiselector.svg'} width={20} onClick={() => setShowPicker(!showPicker)} />
                </EmojiSection>
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
