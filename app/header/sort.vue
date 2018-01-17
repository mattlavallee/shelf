<template>
  <div class="shelf-sort">
    <input type="button" v-model="sortType" v-on:click="updateSort" />
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
.shelf-sort {
  display: inline-block;
  position: relative;
  float: right;
  top: 13px;
  line-height: initial;
}

.shelf-sort input {
  height: 35px;
  width: 125px;
  text-align: center;
  font-size: 16px;
  line-height: 16px;
  border: 1px solid #999999;
  border-radius: 4px;
  background-color: #dddddd;
  touch-action: manipulation;
  cursor: pointer;
  vertical-align: bottom;
}
</style>