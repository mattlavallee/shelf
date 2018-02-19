<template>
  <div class="shelf-header">
    <v-toolbar>
      <v-toolbar-title>
        <img :src="shelfImg" width="50" height="50" /> <h1>shelf</h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <shelf-search></shelf-search>
        <shelf-sort></shelf-sort>
      </v-toolbar-items>
    </v-toolbar>
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
.shelf-header h1 {
  display: inline-block;
  position: relative;
  vertical-align: top;
  top: 5px;
}
</style>