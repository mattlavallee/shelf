<template>
  <div class="shelf-listing">
    <book v-for="entry in sortedListing" :key="entry.id" :data="entry"></book>
  </div>
</template>

<script>
const Vue = require('vue');
import Book from './book.vue';
import {sortBy} from 'lodash';

export default Vue.extend({
  props: ['listing'],
  computed: {
    sortedListing: function() {
      return sortBy(this.listing, ['author', 'title']);
    },
  },
  components: {
    'book': Book,
  },
});
</script>

<style>
  .shelf-listing {
    position: relative;
    margin: 0 5%;
    display: flex;
    flex-wrap: wrap;
  }
</style>