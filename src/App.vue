<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '~bulma';
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.section {
  flex: 1;
}
</style>
