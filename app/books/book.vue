<template>
  <div class="shelf-book">
    <v-flex>
      <v-card width="185" height="250" :hover="showHover">
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
          <v-dialog v-model="dialogOpen" width="600px">
            <v-btn flat color="orange" slot="activator" @click.native="getDescription">Details</v-btn>
            <v-card>
              <v-card-title>
                <div class="headline">{{data.title}} by {{data.author}}</div>
              </v-card-title>
              <v-card-text>
                <div v-if="!description" class="progress-wrapper">
                  <v-progress-circular indeterminate 
                                       :size="50" 
                                       color="primary"></v-progress-circular>
                </div>
                <img :src="image" class="descr-img" />
                <span v-html="description" class="descr-descr"></span>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
const Vue = require('vue');
import { Base64 } from 'js-base64';
import axios from 'axios';

export default Vue.extend({
  props: ['data'],
  data: function() {
    return {
      showHover: true,
      dialogOpen: false,
      image: null,
      description: null,
    };
  },
  computed: {
    filePath: function() {
      return Base64.encode(this.data.path);
    },
    downloadFileName: function() {
      return Base64.encode(this.data.title + ' - ' + this.data.author + 
        (this.data.format === 'MP3' ? '' : '.' + this.data.format.toLowerCase()));
    },
    encodedTitle: function() {
      return Base64.encode(this.data.title);
    },
    encodedAuthor: function() {
      return Base64.encode(this.data.author);
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
    getDescription: function() {
      if (this.description && this.image) {
        return;
      }

      axios.get('./book-details/' + this.encodedTitle + '/' + this.encodedAuthor)
        .then((result) => {
          this.image = result.data.imgUrl;
          this.description = result.data.description;
        });
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

.shelf-book .headline {
  text-align: center;
  width: 100%;
}

.dialog .card__text {
  display: flex;
}

.dialog .descr-img{
  flex: 0 1 0;
  margin-right: 10px;
  height: 160px;
}

.dialog .descr-descr {
  flex: 1 1 0;
}

.dialog .progress-wrapper {
  text-align: center;
  width: 100%;
}
</style>