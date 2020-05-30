import { combineEpics } from 'redux-observable'

import { getUserVisitedCountriesEpic } from './get-user-visited-countries-epic'
import { convertRESTCountriesToOptionsEpic } from './convert-rest-countries-to-options-epic'
import { convertDataReadyForStatsEpic, updateStatsEpic } from './convert-data-ready-for-stats-epic'
import { listenToAddCountryEpic } from './listen-to-add-country-epic'
import { getUserAchievementsEpic } from './get-user-achievements-epic'
import { listenToCountryVisitsEpic } from './listen-to-country-visits-updates-epic'

export default combineEpics(
    convertDataReadyForStatsEpic,
    convertRESTCountriesToOptionsEpic,
    getUserVisitedCountriesEpic,
    getUserAchievementsEpic,
    listenToAddCountryEpic,
    listenToCountryVisitsEpic,
    updateStatsEpic,
)
