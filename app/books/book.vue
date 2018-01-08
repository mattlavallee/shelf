<template>
  <div class="shelf-book">
    <div>
      <img :src="defaultImage()" />
    </div>
    <div class="shelf-book-content">
      <div class="shelf-book-title">{{data.title}}</div>
      <div class="shelf-book-author">{{data.author}}</div>
      <div class="shelf-book-format">{{data.format}}</div>
    </div>
  </div>
</template>

<script>
const Vue = require('vue');
export default Vue.extend({
  props: ['data'],
  methods: {
    defaultImage: function() {
      return this.data.format === "MP3" ?
        "./images/audiobook.png" : "./images/ebook.png";
    },
  },
});
</script>

<style>
.shelf-book {
  border: 1px solid #9d9d9d;
  margin: 5px;
  font-size: 9pt;

  flex: 0 0 125px;
  width: 125px;
  height: 165px;
  padding: 5px;

  text-align: center;
  background-color: #fefefe;
}

.shelf-book img {
  padding-left: 7px;
}

.shelf-book .shelf-book-title {
  font-weight: bold;
}

.shelf-book .shelf-book-format {
  font-style: italic;
}
</style>