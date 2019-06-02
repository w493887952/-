import * as types from './mutation-types'
import { type } from 'os';

const matutaions = {
    [types.SET_CITYCODE](state, CityCode) {
        state.CityCode = CityCode
    },
    [types.SET_SEARCH_HISTORY](state,history) {
        state.searchHistory = history 
    },
    // [types.SET_WARMPROMPT](state,warmPrompt) {
    //     state.warmPrompt = warmPrompt
    // }


}

export default matutaions


