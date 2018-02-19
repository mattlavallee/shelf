<template>
  <div class="shelf-listing">
    <v-container fluid>
      <v-layout row wrap>
        <book v-for="entry in bookListing" :key="entry.id" :data="entry"></book>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
const Vue = require('vue');
import Book from './book.vue';
import {sortBy, filter, lowerCase, includes} from 'lodash';

const types = {
  ebook: 'ebook',
  audiobook: 'audiobook',
};

export default Vue.extend({
  props: ['listing'],
  computed: {
    bookListing: function() {
      const shouldIncludeEbooks = this.$store.getters.getFilters.includes('includeEbooks');
      const shouldIncludeAudiobooks = this.$store.getters.getFilters.includes('includeAudiobooks');
      let filteredList = filter(this.listing, (book) => {
        //filter out results based on ebook vs audiobook filters
        if ((book.type === types.ebook && !shouldIncludeEbooks) ||
          (book.type === types.audiobook && !shouldIncludeAudiobooks)) {
            return false;
        }

        //if there is no search text, allow the result to be shown
        if (this.$store.getters.getSearchFilter === '' ||
           !this.$store.getters.getSearchFilter) {
          return true;
        }

        //filter on title or author
        const bookTitle = lowerCase(book.title);
        const bookAuthor = lowerCase(book.author);
        const searchQuery = lowerCase(this.$store.getters.getSearchFilter);
        return includes(bookTitle, searchQuery) ||
               includes(bookAuthor, searchQuery);
      });

      let sortOrder = ['author', 'title'];
      if (this.$store.getters.sortType === 'title') {
        sortOrder.reverse();
      }
      return sortBy(filteredList, sortOrder);
    }
  },
  components: {
    'book': Book,
  },
});
</script>

<style>
  .shelf-listing .layout {
    justify-content: center;
  }
</style>