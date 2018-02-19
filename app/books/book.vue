<template>
  <div class="shelf-book">
    <v-flex>
      <v-card width="185" height="250">
        <v-card-media height="100px">
          <v-icon>{{imageClass()}}</v-icon>
        </v-card-media>
        <v-card-title primary-title>
          <div style="width: 100%">
            <div class="shelf-book-title">{{data.title}}</div>
            <div class="shelf-book-author">{{data.author}}</div>
            <div class="shelf-book-format">{{data.format}}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange"
            @click="downloadFile">Download</v-btn>
          <v-btn flat color="orange">Details</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
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
        "fa-headphones" : "fa-tablet";
    },
    downloadFile: function() {
      window.open('./download/' + this.filePath + '?name=' + this.downloadFileName);
    },
  },
});
</script>

<style>
.shelf-book {
  margin:5px;
  text-align: center;
}

.shelf-book .card__media__content {
  justify-content: center;
}

.shelf-book .card__title {
  padding: 8px !important;
}

.shelf-book .icon {
  font-size: 100px;
  color: #000;
}

.shelf-book .shelf-book-title {
  font-weight: bold;
}

.shelf-book .shelf-book-format {
  font-style: italic;
}

.shelf-book .card__actions {
  position: absolute;
  bottom: 0px;
  width: 185px;
}
.shelf-book .card__actions button {
  min-width: 82px !important;
}
</style>