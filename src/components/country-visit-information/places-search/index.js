import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import React from 'react'
import styled from 'styled-components'

const SearchContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const AddDestinations = styled.div`
    font-size: 20px;
    text-transform: uppercase;
`

export const PlacesSearch = ({ country, countries, mapMarkers, setHasVisitedCapital, setMapMarkers }) => {
    const isItACapital = (place) => {
        const foundCountry = countries.restAPICountries.find(
            (ctry) => ctry.name.toLowerCase() === country.name.toLowerCase(),
        )
        if (foundCountry) {
            if (foundCountry.capital.toLowerCase() === place.toLowerCase()) {
                setHasVisitedCapital(true)
                return true
            }
            return false
        }
        return false
    }

    const getLatLngForSpecificPlace = (place) => {
        var geocoder = new window.google.maps.Geocoder()

        try {
            geocoder.geocode({ address: place }, function (results, status) {
                if (status == window.google.maps.GeocoderStatus.OK) {
                    const cityLat = results[0].geometry.location.lat()
                    const cityLng = results[0].geometry.location.lng()
                    isItACapital(place)

                    const cityInformation = {
                        name: place,
                        lng: cityLng,
                        lat: cityLat,
                    }

                    setMapMarkers([...mapMarkers, cityInformation])
                    window.scrollTo(0, document.body.scrollHeight)
                } else {
                    alert('Place not recognized, please try searching again')
                }
            })
        } catch (e) {
            console.log('ERR:', e)
        }
    }

    return (
        <SearchContainer>
            <AddDestinations>Add specific destinations</AddDestinations>
            <div>
                <GooglePlacesAutocomplete
                    onSelect={(e) => getLatLngForSpecificPlace(e.structured_formatting.main_text)}
                    placeholder="Search for a place you visited..."
                    inputStyle={{
                        border: `1px solid #ccc`,
                        boxShadow: 'none',
                        fontSize: '13px',
                        margin: '10px',
                        padding: '5px',
                        width: '200px',
                    }}
                />
            </div>
        </SearchContainer>
    )
}
