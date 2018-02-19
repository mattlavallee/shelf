<template>
  <div class="shelf-sort">
    <v-layout row>
      <v-btn color="info" v-on:click="updateSort">{{sortType}}</v-btn>
    </v-layout>
  </div>
</template>

<script>
const Vue = require('vue');
import {capitalize} from 'lodash';

export default Vue.extend({
  computed: {
    sortType: function() {
      return 'Sort by ' + capitalize(this.$store.getters.sortType);
    },
  },
  methods: {
    updateSort: function() {
      const newSortType = this.$store.getters.sortType === 'author' ?
        'title' : 'author';
      this.$store.commit('updateSortType', newSortType);
    }
  }
});
</script>

<style>
.shelf-sort .layout {
  position: relative;
  padding-left: 5px;
  height: 24px;
  top: 18px;
}

.shelf-sort .layout button {
  width: 156px;
}
</style>