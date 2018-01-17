'use strict';

const Vue = require('vue');
const Vuex = require('vuex');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filters: {
      search: '',
      includeAudiobooks: true,
      includeEbooks: true,
    },
    sortType: 'author',
  },
  getters: {
    getSearchFilter: (state: any) => state.filters.search,
    shouldIncludeAudiobooks: (state: any) => state.filters.includeAudiobooks,
    shouldIncludeEbooks: (state: any) => state.filters.includeEbooks,
    sortType: (state: any) => state.sortType,
  },
  mutations: {
    updateFilter(state: any, updateVal: {[key:string]: string|boolean}) {
      Vue.set(state.filters, updateVal.key, updateVal.value);
    },
    updateSortType(state: any, val: string) {
      Vue.set(state, 'sortType', val);
    }
  }
});
