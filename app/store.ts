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
  },
});
