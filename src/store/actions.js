import * as types from './mutation-types'

import {saveSearch, clearSearch} from './cache'


export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

// export const deleteSearchHistory = function ({commit}, query) {
//   commit(types.SET_SEARCH_HISTORY, deleteSearch(query))

// }



export const clearSearchHistory = function ({commit}) {
  commit (types.SET_SEARCH_HISTORY, clearSearch())
} 