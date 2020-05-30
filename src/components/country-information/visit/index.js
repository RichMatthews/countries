import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import isEqual from 'lodash.isequal'
import AutosizeInput from 'react-input-autosize'

import { updateTripDetails } from 'redux/action-creators/user/update-trip-details'
import { KIERAN_GREY } from 'styles'

const StyledVisit = styled.div`
    background: #fff;
    color: ${KIERAN_GREY};
    display: flex;
    flex-direction: column;
    font-size: 20px;
    border-bottom: 1px solid #ccc;
    max-height: ${({ hidden }) => (hidden ? '50px' : 'none')};
    overflow: ${({ hidden }) => (hidden ? 'hidden' : 'auto')};

    & > div {
        margin: 7px;
        margin-top: 12px;
    }
`

const Dates = styled.div`
    color: #ccc;
    font-size: 15px;
`

const EditInput = styled.div`
    background: #ff5a5f;
    border: 1px solid #ff5a5f;
    border-radius: 5px;
    color: #fff;
    display: inline-block;
    padding: 7px;
    margin: 5px;
    margin-left: 0;
    text-align: center;
    outline: none;
    cursor: default;
`

const Travellers = styled.div`
    display: flex;
    font-size: 14px;
    margin-top: 0 !important;
`

const Places = styled(Travellers)`
    align-items: center;
    justify-content: space-between;
`

const AmendButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    max-height: 35px;
    & > div {
        background: #fff;
        border: 1px solid ${KIERAN_GREY};
        border-radius: 4px;
        color: ${KIERAN_GREY};
        cursor: pointer;
        padding: 5px;
        margin-bottom: 5px;
        font-size: 15px;
    }
`

const TopRow = styled.div`
    display: flex;
    justify-content: space-between;

    & div:first-child {
        display: flex;
        justify-content: space-between;
    }
`

const Saving = styled.div`
    color: #ccc !important;
    border-color: #ccc !important;
    cursor: not-allowed !important;
`

const ShowButtons = styled.div`
    color: #3f99bf;
    cursor: pointer;
    font-size: 15px;
`

const AllEditButtons = styled.div`
    display: flex;
    align-items: center;
`

const TravellersAndPlacesHeadings = styled.div`
    font-size: 17px;
`

export const Visit = ({ country, updateTripDetails, visit }) => {
    const [visitNameEdit, setVisitNameEdit] = useState(null)
    const [visitDetails, setVisitDetails] = useState(null)
    const [loading, setLoading] = useState(false)
    const [holder, setHolder] = useState('')
    const [hidden, setHidden] = useState(true)

    useEffect(() => {
        setVisitDetails(visit)
    }, [visit])

    const editHelper = (visitName) => {
        setVisitNameEdit(visitName)
    }

    const changeVisitDetails = (e) => {
        const newVisitDetails = { ...visitDetails }
        newVisitDetails.visitName = e.target.value
        setVisitDetails(newVisitDetails)
    }

    const changeVisitPeopleDetails = (e, index) => {
        let newVisitDetails = { ...visitDetails }
        newVisitDetails.people[index] = e.target.value

        setVisitDetails({ ...visitDetails, people: newVisitDetails.people })
    }

    const changeVisitPlacesDetails = (e, index) => {
        let newVisitDetails = { ...visitDetails }
        newVisitDetails.places[index] = e.target.value

        setVisitDetails({ ...visitDetails, places: newVisitDetails.places })
    }

    const updateEditedVisit = () => {
        setLoading(true)
        setVisitNameEdit(null)

        const changedVisit = {
            ...visit,
            people: visit.people.toString().replace(/^,+|,+$/g, ''),
            places: visit.places.toString().replace(/^,+|,+$/g, ''),
        }
        const convertDataBackForFirebase = {
            ...visitDetails,
            people: visitDetails.people.toString().replace(/^,+|,+$/g, ''),
            places: visitDetails.places
                .concat(holder)
                .toString()
                .replace(/^,+|,+$/g, ''),
        }

        const noChanges = isEqual(visit, convertDataBackForFirebase)
        updateTripDetails(country, changedVisit, convertDataBackForFirebase)

        setTimeout(() => {
            setHolder('')
            setLoading(false)
        }, 3000)
        if (noChanges) {
            return
        } else {
            // updateTripDetails(country, visit, visitDetails)
        }
    }

    const styles = {
        border: '1px solid #ff5a5f',
        borderRadius: '5px',
        color: '#ff5a5f',
        display: 'inline-block',
        padding: '7px',
        margin: '5px',
        textAlign: 'center',
        outline: 'none',
        cursor: 'default',
        '& > input': {
            border: 'none',
            marginTop: '2px',
            outline: 'none',
        },
    }

    return visitDetails ? (
        visitNameEdit ? (
            <StyledVisit hidden={hidden}>
                <TopRow>
                    <div>
                        <img src="/images/passport.svg" height="30" width="30" />
                        <AutosizeInput
                            value={visitDetails.visitName}
                            onChange={(e) => changeVisitDetails(e)}
                            style={styles}
                        />
                    </div>
                    <div>
                        <AmendButtons onClick={() => updateEditedVisit()}>Save</AmendButtons>
                    </div>
                </TopRow>
                <Dates>
                    <div>
                        {moment.unix(visitDetails.startDate).format('Do MMM')} -{' '}
                        {moment.unix(visitDetails.endDate).format('Do MMM YYYY')}
                    </div>
                </Dates>
                <Travellers>
                    <div>
                        <TravellersAndPlacesHeadings>Travellers</TravellersAndPlacesHeadings>
                        {visitDetails.people.map((ppl, index) => (
                            <AutosizeInput
                                value={ppl}
                                onChange={(e) => changeVisitPeopleDetails(e, index)}
                                style={styles}
                            />
                        ))}
                    </div>
                </Travellers>
                <Travellers>
                    <div>
                        <TravellersAndPlacesHeadings>Places you visited</TravellersAndPlacesHeadings>
                        {visitDetails.places.map((place, index) => (
                            <AutosizeInput
                                value={place}
                                onChange={(e) => changeVisitPlacesDetails(e, index)}
                                style={styles}
                            />
                        ))}
                        <AutosizeInput value={holder} onChange={(e) => setHolder(e.target.value)} style={styles} />
                    </div>
                </Travellers>
            </StyledVisit>
        ) : (
            <StyledVisit hidden={hidden}>
                <TopRow>
                    <div>
                        <img src="/images/passport.svg" height="30" width="30" />
                        <div style={{ marginLeft: '15px' }}>{visitDetails.visitName}</div>
                    </div>
                    <AllEditButtons>
                        {hidden ? (
                            <ShowButtons onClick={() => setHidden(false)}>Show more</ShowButtons>
                        ) : loading ? (
                            <Saving>Saving...</Saving>
                        ) : (
                            <>
                                <ShowButtons onClick={() => setHidden(true)}>Show Less</ShowButtons>
                            </>
                        )}
                    </AllEditButtons>
                </TopRow>
                <Dates>
                    <div>
                        {moment.unix(visitDetails.startDate).format('Do MMM')} -{' '}
                        {moment.unix(visitDetails.endDate).format('Do MMM YYYY')}
                    </div>
                </Dates>
                <Travellers>
                    <div>
                        <TravellersAndPlacesHeadings>Travellers</TravellersAndPlacesHeadings>
                        {visitDetails.people.map((ppl, index) => (
                            <EditInput>{ppl}</EditInput>
                        ))}
                    </div>
                </Travellers>
                <Places>
                    <div>
                        <TravellersAndPlacesHeadings>Places you visited</TravellersAndPlacesHeadings>
                        {visitDetails.places.map((place, index) => (
                            <EditInput>{place}</EditInput>
                        ))}
                    </div>
                    <div>
                        <AmendButtons onClick={() => editHelper(visitDetails.visitName)}>Edit</AmendButtons>
                    </div>
                </Places>
            </StyledVisit>
        )
    ) : (
        <div>Loading...</div>
    )
}

const mapDispatch = {
    updateTripDetails,
}

export const CONNECTED_VISIT = connect(null, mapDispatch)(Visit)
