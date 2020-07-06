import GoogleMapReact from 'google-map-react'
import React, { useEffect } from 'react'
import styled from 'styled-components'

const MarkerName = styled.div`
    background: white;
    border-radius: 6px;
    box-shadow: 0 1px 4px rgba(41, 51, 57, 0.5);
    display: inline-block;
    font-size: 13px;
    padding: 5px;
    position: relative;
    min-width: 50px;
    left: 0;
    right: -14px;
    top: 10px;
    text-align: center;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
`

const StyledMarker = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50% 50% 50% 0;
    background: #ff385c;
    position: absolute;
    transform: rotate(-45deg);
    left: -15px;
    top: -35px;
    &:after {
        content: '';
        width: 14px;
        height: 14px;
        margin: 8px 0 0 8px;
        background: #2f2f2f;
        position: absolute;
        border-radius: 50%;
    }
`

const Marker = (props) => (
    <div>
        <StyledMarker onClick={() => props.onChildClick()}></StyledMarker> <MarkerName>{props.name}</MarkerName>
    </div>
)

export const VisitMap = ({ country, mapMarkers }) => {
    useEffect(() => {
        const googleMapsApiScript = document.createElement('script')
        const googlePlacesApiScript = document.createElement('script')
        googleMapsApiScript.src = 'https://maps.google.com/maps/api/js?key=AIzaSyBe80OhcYpEiTJ7xcYPySebKTUS30OW28M'
        googlePlacesApiScript.src =
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyBe80OhcYpEiTJ7xcYPySebKTUS30OW28M&libraries=places'
        document.body.appendChild(googleMapsApiScript)
        document.body.appendChild(googlePlacesApiScript)
    }, [])

    const markerClicked = (marker) => {
        console.log('clicked...')
        console.log('The marker that was clicked is', marker)
    }

    const initGeocoder = ({ map, maps }) => {
        var latlng = mapMarkers
        var latlngbounds = new maps.LatLngBounds()
        if (latlng.length) {
            for (var i = 0; i < latlng.length; i++) {
                latlngbounds.extend(latlng[i])
            }
            map.fitBounds(latlngbounds)
            map.setCenter(country.name)
            map.setZoom(map.getZoom() - 1)
            if (map.getZoom() > 15) {
                map.setZoom(5)
            }
        } else {
            const Geocoder = new maps.Geocoder()
            Geocoder.geocode({ address: country.name }, (results, status) => {
                if (status == maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location)
                    map.fitBounds(results[0].geometry.bounds)
                } else {
                    console.log('we could not find that address')
                }
            })
        }
    }

    return (
        mapMarkers.length > 0 && (
            <div style={{ width: '90%', height: '400px', margin: 'auto', paddingBottom: '50px' }}>
                <GoogleMapReact
                    key={mapMarkers}
                    onGoogleApiLoaded={initGeocoder}
                    options={{
                        disableDefaultUI: true,
                        disableDoubleClickZoon: true,
                        draggable: false,
                        scrollwheel: false,
                        zoomControl: false,
                    }}
                    distanceToMouse={() => {}}
                    bootstrapURLKeys={{ key: 'AIzaSyBe80OhcYpEiTJ7xcYPySebKTUS30OW28M' }}
                    defaultZoom={5}
                    defaultCenter={{
                        lat: -27,
                        lng: 133,
                    }}
                    yesIWantToUseGoogleMapApiInternals
                >
                    {mapMarkers.map((marker) => (
                        <Marker
                            lat={marker.lat}
                            lng={marker.lng}
                            name={marker.name}
                            onChildClick={() => markerClicked(marker)}
                        />
                    ))}
                </GoogleMapReact>
            </div>
        )
    )
}
