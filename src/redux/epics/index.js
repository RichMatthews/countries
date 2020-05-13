import { combineEpics } from 'redux-observable'

import { getUserVisitedCountriesEpic } from './get-user-visited-countries-epic'
import { convertRESTCountriesToOptionsEpic } from './convert-rest-countries-to-options-epic'
import { convertDataReadyForStatsEpic } from './convert-data-ready-for-stats-epic'

export default combineEpics(
    getUserVisitedCountriesEpic,
    convertRESTCountriesToOptionsEpic,
    convertDataReadyForStatsEpic,
)
