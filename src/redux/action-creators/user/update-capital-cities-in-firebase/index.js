export const updateCapitalCitiesInFirebase = (place) => {
    return {
        type: 'UPDATE_PLACES_VISITED_AND_MILES_TRAVELLED',
        place,
    }
}
