'use strict';

require('vuetify/dist/vuetify.min.css');

const Vue = require('vue');
const Vuetify = require('vuetify').default;
import BookListing from './books/listing.vue';
import Header from './header/header.vue';
import {default as store} from './store';

Vue.use(Vuetify);

window.onload = function() {
  new Vue({
    el: '#shelf-app',
    store,
    components: {
      'book-listing': BookListing,
      'app-header': Header,
    },
  });
};
