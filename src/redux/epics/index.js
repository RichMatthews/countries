import { combineEpics } from 'redux-observable'

import { convertRESTCountriesToOptionsEpic } from './convert-rest-countries-to-options-epic'
import { getUserAchievementsEpic } from './get-user-achievements-epic'
import {
    getUserVisitedCountriesEpic,
    getUserInformationEpic,
    getUserStatsEpic,
} from './get-user-visited-countries-epic'
import {
    convertDataReadyForStatsEpic,
    getCapitalsVisitedAndMilesTravelledEpic,
    getMostVisitedCountryEpic,
    updateStatsEpic,
} from './convert-data-ready-for-stats-epic'
import { listenToAddCountryEpic } from './listen-to-add-country-epic'
import { listenToCountryVisitsEpic } from './listen-to-country-visits-updates-epic'
import { setNewUserInformationEpic } from './set-new-user-information-epic'
import { updateCapitalCitiesAndMilesTravelledEpic } from './update-capital-cities-epic'

export default combineEpics(
    // getUserAchievementsEpic,
    convertDataReadyForStatsEpic,
    convertRESTCountriesToOptionsEpic,
    getCapitalsVisitedAndMilesTravelledEpic,
    getMostVisitedCountryEpic,
    getUserVisitedCountriesEpic,
    getUserInformationEpic,
    getUserStatsEpic,
    listenToAddCountryEpic,
    listenToCountryVisitsEpic,
    setNewUserInformationEpic,
    updateStatsEpic,
    updateCapitalCitiesAndMilesTravelledEpic,
)
