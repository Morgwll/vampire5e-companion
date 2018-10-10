<template>
  <div id="app">
    <component :is="selected"></component>
  </div>
</template>
<script>
import appCharacter from './components/Character.vue';

export default {
  data() {
    return {
      selected: appCharacter
    }
  }
}
</script>
<style lang="scss">
</style>