import { combineEpics } from 'redux-observable'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'

const restCountriesReceived = (payload) => ({ type: 'REST_COUNTRIES_RECEIVED_SUCCESS', data: payload })
const restCountriesOptionsGenerated = (payload) => ({ type: 'REST_COUNTRIES_OPTIONS_GENERATED', data: payload })

const convertCountriesToOptions = (countries) => {
    let newCountries = []
    countries.map((country) => {
        const optionsObject = {
            value: country.name,
            label: country.name,
            flag: country.flag,
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
