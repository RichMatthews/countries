import { UPDATE_TRIP_DETAILS } from 'redux/types'

export const updateTripDetails = (country, currentVisitDetails, newVisitDetails) => {
    return {
        type: UPDATE_TRIP_DETAILS,
        country,
        currentDetails: currentVisitDetails,
        newDetails: newVisitDetails,
    }
}
