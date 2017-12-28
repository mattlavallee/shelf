<template>
  <div class="shelf-book">
    <div>{{data.title}}</div>
    <div>{{data.author}}</div>
    <div>{{data.format}}</div>
  </div>
</template>

<script>
const Vue = require('vue');
export default Vue.extend({
  props: ['data'],
});
</script>

<style>
.shelf-book {
  border: 1px solid #9d9d9d;
  margin: 5px;
}
</style>