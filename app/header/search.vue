<template>
  <div class="shelf-search">
    <input type="text" placeholder="Search..." />
    <div class="type-filters">
      <input type="checkbox" value="ebooks" checked /> <span>Ebooks</span><br />
      <input type="checkbox" value="audiobooks" checked /> <span>Audiobooks</span>
    </div>
  </div>
</template>

<script>
const Vue = require('vue');

export default Vue.extend({});
</script>

<style>
.shelf-search {
  display: inline-block;
  position: relative;
  margin-left: 15px;
  top: -3px;
  line-height: initial;
  vertical-align: text-bottom;
}

.shelf-search input[type="text"] {
  width: 350px;
  height: 30px;
  font-size: 14pt;
  border-radius: 5px;
  border: 1px solid #fefefe;
  padding: 5px;
}

.shelf-search .type-filters {
  display: inline-block;
  font-size: 8pt;
  vertical-align: middle;
}

.shelf-search .type-filters input {
  margin-right: 0;
}

.shelf-search .type-filters span {
  position: relative;
  top: -3px;
}
</style>