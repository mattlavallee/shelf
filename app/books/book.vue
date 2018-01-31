<template>
  <div class="shelf-book">
    <div class="shelf-book-display">
      <i v-bind:class="'display fa ' + imageClass()"></i>
      <a v-bind:href="'./download/' + filePath + '?name=' + downloadFileName" 
           target="_blank" title="Download">
        <i class="fa fa-download shelf-book-download"></i>
      </a>
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
import { Base64 } from 'js-base64';

export default Vue.extend({
  props: ['data'],
  computed: {
    filePath: function() {
      return Base64.encode(this.data.path);
    },
    downloadFileName: function() {
      return Base64.encode(this.data.title + ' - ' + this.data.author + 
        (this.data.format === 'MP3' ? '' : '.' + this.data.format.toLowerCase()));
    }
  },
  methods: {
    imageClass: function() {
      return this.data.format === "MP3" ?
        "fa-tablet" : "fa-headphones";
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

.shelf-book .shelf-book-display {
  position: relative;
}

.shelf-book .shelf-book-display a:link {
  color: #000;
}
.shelf-book .shelf-book-display a:visited {
  color: #000;
}
.shelf-book .shelf-book-display a:hover {
  color: #000;
}
.shelf-book .shelf-book-display a:active {
  color: #000;
}

.shelf-book .shelf-book-display i.display {
  font-size: 100px;
  padding-left: 7px;
}

.shelf-book .shelf-book-download {
  display: none;
  font-size: 90px;
  top: 5px;
  padding-left: 23px;
  position: absolute;
}

.shelf-book .shelf-book-display:hover i.display {
  opacity: 0.2;
}

.shelf-book .shelf-book-display:hover .shelf-book-download {
  display: block;
}

.shelf-book .shelf-book-title {
  font-weight: bold;
}

.shelf-book .shelf-book-format {
  font-style: italic;
}
</style>