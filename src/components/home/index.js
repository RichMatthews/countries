import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { fromEvent, Observable, timer } from 'rxjs'
import { retryWhen, delayWhen } from 'rxjs/operators'
import Modal from 'react-modal'
import Calendar from 'react-calendar'
import moment from 'moment'
import 'react-calendar/dist/Calendar.css'
import Select from 'react-select'

const StyledSelect = styled(Select)`
    margin-bottom: 20px;
`

const Container = styled.div`
    margin-top: 50px;
`

const Inner = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Heading = styled.div`
    font-size: 48px;
    margin-bottom: 30px;
    text-align: center;
    width: 450px;
`

const Button = styled.div`
    background: #3baba4;
    color: #fff;
    cursor: pointer;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
`

const Input = styled.input`
    border: none;
    border: solid 1px #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 15px;
    margin-bottom: 20px;
    padding: 10px;
    padding-left: 40px;
    width: 100%;
`

const DateComponent = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #757575;
    font-size: 15px;
    margin-bottom: 20px;
    padding: 10px;
`

const Image = styled.img`
    margin-left: 8px;
    margin-top: 8px;
    position: absolute;
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

export const Home = ({ countries }) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [country, setCountry] = useState(null)
    const [people, setPeople] = useState(null)
    const [success, setSuccess] = useState(null)
    const [date, setDate] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [calendar, showCalendar] = useState(false)
    const [options, setOptions] = useState([{}])

    useEffect(() => {
        const countriesToShow = []
        countries.forEach((country) => countriesToShow.push({ label: country.name, value: country.name }))
        setOptions(countriesToShow)
    }, [countries])

    const submitCountryDetailsToBackend = () => {
        setLoading(true)
        // fetch('/api/add-country', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ country, people }),
        // })
        //     .then((res) => res.json())
        //     .then((body) => {
        //         setLoading(false)
        //         setSuccess(body.message)
        //     })
        const postHttpObservable = () => {
            return Observable.create((observer) => {
                fetch('/api/add-country', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ country, people, date }),
                })
                    .then((res) => res.json())
                    .then((body) => {
                        observer.next(body)
                        observer.complete()
                    })
                    .catch((err) => observer.error(console.log(err)))
            })
        }

        const http$ = postHttpObservable('/api/add-country')
        const submit = http$.pipe(retryWhen((errors) => errors.pipe(delayWhen(() => timer(2000)))))
        submit.subscribe((x) => setStuff(x))
    }

    const setStuff = (x) => {
        setLoading(false)
        setSuccess(x.message)
    }

    const setDateHelper = (date) => {
        const from = moment(date[0]).format('Do MMM YYYY')
        const to = moment(date[1]).format('Do MMM YYYY')
        setDate(`${from} - ${to}`)
        showCalendar(false)
    }

    const modalStyles = {
        content: {
            height: '370px',
            margin: 'auto',
            width: '450px',
        },
        overlay: {
            background: 'rgba(49, 49, 49, 0.9)',
        },
    }
    return (
        <Container>
            <Inner>
                <Heading>Remember every trip to every country</Heading>
                <Button onClick={() => setModalOpen(true)}>Add Trip</Button>
            </Inner>

            <Modal isOpen={isModalOpen} style={modalStyles} contentLabel="Example Modal">
                <ModalContent>
                    <ClosedIcon src="/images/cancel.svg" onClick={() => setModalOpen(false)} />
                    <h3>ADD A VISIT</h3>
                    <Image src="/images/trip-name.svg" />
                    <Input placeholder="Give the visit a memorable name" onChange={(e) => setPeople(e.target.value)} />

                    <StyledSelect options={options} placeholder="Start typing to find a country..." />
                    <DateComponent onClick={() => showCalendar(!calendar)} value={date}>
                        {date ? date : 'Select date'}
                    </DateComponent>
                    {calendar ? (
                        <>
                            <Image src="/images/calendar.svg" />
                            <Calendar selectRange onChange={(date) => setDateHelper(date)} />
                        </>
                    ) : null}

                    <Image src="/images/companion.svg" />
                    <Input placeholder="Who did you go with" onChange={(e) => setPeople(e.target.value)} />
                    <Button onClick={submitCountryDetailsToBackend}>Submit</Button>

                    <div>{success || null}</div>
                    {isLoading ? <Image src="/images/loading.gif" width="30" style={{ margin: 'auto' }} /> : null}
                </ModalContent>
            </Modal>
        </Container>
    )
}
