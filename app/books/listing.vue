<template>
  <div class="shelf-listing">
    <book v-for="entry in listing" :key="entry.id" :data="entry"></book>
  </div>
</template>

<script>
const Vue = require('vue');
import Book from './book.vue';
export default Vue.extend({
  props: ['listing'],
  components: {
    'book': Book,
  },
});
</script>

<style>
</style>