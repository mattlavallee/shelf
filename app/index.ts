'use strict';

const Vue = require('vue');
import BookListing from './books/listing.vue';
import Header from './header/header.vue'

window.onload = function() {
  new Vue({
    el: '#shelf-app',
    components: {
      'book-listing': BookListing,
      'app-header': Header,
    },
  });
};
