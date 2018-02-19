<template>
  <div class="shelf-search">
    <v-layout row>
      <v-text-field v-model="searchText" prepend-icon="fa-search" @input="onSearchChange"></v-text-field>
      <v-flex xs6 sm3>
        <v-btn-toggle multiple v-model="toggleFilters" active-class="btn-primary">
          <v-btn flat value="includeEbooks" title="Filter Ebooks">
            <v-icon>fa-tablet</v-icon>
          </v-btn>
          <v-btn flat value="includeAudiobooks" title="Filter Audiobooks">
            <v-icon>fa-headphones</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
const Vue = require('vue');

export default Vue.extend({
  computed: {
    searchText: {
      get() {
        return this.$store.getters.getSearchFilter;
      },
      set(val) {
        this.$store.commit('updateFilter', {key:'search', value: val});
      },
    },
    toggleFilters: {
      get() {
        return this.$store.getters.getFilters;
      },
       set(val) {
         this.$store.commit('updateFilter', {key: 'filters', value: val});
       }
    }
  },
  methods: {
    onSearchChange: function(val) {
      this.$store.commit('updateFilter', {key: 'search', value: val});
    },
  },
});
</script>

<style>
.shelf-search .flex {
  position: relative;
  height: 50%;
  top: 18px;
  padding-left: 10px;
}

.shelf-search button {
  padding: 2px 8px;
}

.shelf-search button.btn--flat {
  background-color: #b3d4fc !important;
  border-color: #b3d4fc !important;
  color: #000;
}

.shelf-search button.btn--active {
  background-color: #2196f3 !important;
  border-color: #2196f3 !important;
  color: #fff !important;
}
</style>