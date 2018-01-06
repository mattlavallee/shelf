<template>
  <div class="shelf-header">
    <img :src="shelfImg" width="50" height="50" />
    <h1>shelf</h1>
  </div>
</template>

<script>
const Vue = require('vue');
export default Vue.extend({
  data: function() {
    return {
      shelfImg: './images/shelf.png',
    };
  },
});
</script>

<style>
.shelf-header {
  height: 60px;
  background-color: #dee1d8;
  border-bottom: 1px solid #591902;
  padding-left: 5%;
  line-height: 60px;
}

h1 {
  color: #40371e;
  display: inline;
  position: relative;
  top: -10px;
}
</style>