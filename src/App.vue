<template>
  <div id="app">
    <component :is="selected"></component>
  </div>
</template>
<script>
import appCharacter from './components/Character.vue';
import appCharacterCreation from './components/CharacterCreation.vue';

export default {
  data() {
    return {
      selected: appCharacterCreation
    }
  }
}
</script>
<style lang="scss">
</style>