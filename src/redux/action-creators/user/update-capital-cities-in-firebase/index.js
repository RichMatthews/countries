export const updateCapitalCitiesInFirebase = (places) => {
    return {
        type: 'UPDATE_PLACES_VISITED_AND_MILES_TRAVELLED',
        places,
    }
}
