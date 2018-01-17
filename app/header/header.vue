<template>
  <div class="shelf-header">
    <img :src="shelfImg" width="50" height="50" />
    <h1>shelf</h1>
    <shelf-search></shelf-search>
    <shelf-sort></shelf-sort>
  </div>
</template>

<script>
const Vue = require('vue');
import Search from './search.vue';
import Sort from './sort.vue';

export default Vue.extend({
  data: function() {
    return {
      shelfImg: './images/shelf.png',
    };
  },
  components: {
    'shelf-search': Search,
    'shelf-sort': Sort,
  },
});
</script>

<style>
.shelf-header {
  height: 60px;
  background-color: #dee1d8;
  border-bottom: 1px solid #591902;
  padding-left: 5%;
  padding-right: 5%;
  line-height: 60px;
}

h1 {
  color: #40371e;
  display: inline;
  position: relative;
  top: -10px;
}
</style>