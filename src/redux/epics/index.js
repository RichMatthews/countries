import { combineEpics } from 'redux-observable'

import { convertRESTCountriesToOptionsEpic } from './convert-rest-countries-to-options-epic'
import { getUserAchievementsEpic } from './get-user-achievements-epic'
import { getUserVisitedCountriesEpic, getUserInformationEpic } from './get-user-visited-countries-epic'
import {
    convertDataReadyForStatsEpic,
    getMostVisitedCountryEpic,
    updateStatsEpic,
} from './convert-data-ready-for-stats-epic'
import { listenToAddCountryEpic } from './listen-to-add-country-epic'
import { listenToCountryVisitsEpic } from './listen-to-country-visits-updates-epic'

export default combineEpics(
    // getUserAchievementsEpic,
    convertDataReadyForStatsEpic,
    convertRESTCountriesToOptionsEpic,
    getMostVisitedCountryEpic,
    getUserVisitedCountriesEpic,
    getUserInformationEpic,
    listenToAddCountryEpic,
    listenToCountryVisitsEpic,
    updateStatsEpic,
)
