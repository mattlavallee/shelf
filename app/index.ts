'use strict';

const Vue = require('vue');
import BookListing from './books/listing.vue';
import Header from './header/header.vue';
import {default as store} from './store';

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
