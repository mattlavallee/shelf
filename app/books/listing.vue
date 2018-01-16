<template>
  <div class="shelf-listing">
    <book v-for="entry in bookListing" :key="entry.id" :data="entry"></book>
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
      let filteredList = filter(this.listing, (book) => {
        //filter out results based on ebook vs audiobook filters
        if ((book.type === types.ebook && !this.$store.getters.shouldIncludeEbooks) ||
          (book.type === types.audiobook && !this.$store.getters.shouldIncludeAudiobooks)) {
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
      return sortBy(filteredList, ['author', 'title']);
    }
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