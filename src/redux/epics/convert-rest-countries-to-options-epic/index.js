import { catchError, mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import { REST_COUNTRIES_DROPDOWN_OPTIONS_GENERATED, REST_COUNTRIES_RECEIVED_SUCCESS } from 'redux/types'

import { countryNameConverter } from 'utils/countryNameConverter'
import { continentHelper } from 'utils/continentHelper'
import { countryCodes, findCountryCode } from 'utils/findCountryCode'

const restCountriesReceived = (payload) => ({ type: REST_COUNTRIES_RECEIVED_SUCCESS, countries: payload })
const restCountriesOptionsGenerated = (payload) => ({
    type: REST_COUNTRIES_DROPDOWN_OPTIONS_GENERATED,
    options: payload,
})

const convertCountriesToOptions = (countries) => {
    let newCountries = []
    countries.forEach((country) => {
        const ctry = countryNameConverter(country.name)
        const countryCode = findCountryCode(ctry, countryCodes)
        const continent = continentHelper(country)
        const optionsObject = {
            countryCode: countryCode,
            value: ctry,
            label: ctry,
            flag: country.flag,
            trimmed: ctry.toLowerCase().replace(/ /g, ''),
            smallFlag: `http://catamphetamine.gitlab.io/country-flag-icons/3x2/${countryCode}.svg`,
            continent,
        }
        newCountries.push(optionsObject)
    })
    return newCountries
}

export const convertRESTCountriesToOptionsEpic = (action$, state$) =>
    action$.pipe(
        ofType('GET_REST_COUNTRIES_DATA'),
        mergeMap(() =>
            ajax.getJSON(`https://restcountries.eu/rest/v2/all`).pipe(
                mergeMap((response) => {
                    const options = convertCountriesToOptions(response)
                    return [restCountriesReceived(response), restCountriesOptionsGenerated(options)]
                }),
            ),
        ),
        catchError((err) => Promise.resolve({ type: 'CHANGE_THIS_AT_SOME_POINT', message: err.message })),
    )
