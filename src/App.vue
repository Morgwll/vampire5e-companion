<template>
  <div id="app">
    <component :is="logReg"/>
    <hr>
    <component :is="selected"/>
  </div>
</template>
<script>
import appLogin from './components/Login.vue';
import appRegister from './components/Register.vue';
import appCharacter from './components/Character.vue';
import appCharacterCreation from './components/CharacterCreation.vue';

export default {
  components: {
    appLogin,
    appRegister,
    appCharacter,
    appCharacterCreation
  },
  data() {
    return {
      logReg: appRegister,
      selected: appCharacterCreation,
    }
  },
  methods: {
    login() {
      this.$http.post('', this.user)
        .then(response => {
          console.log(response);
        }, error => {
          console.log(error);
        });
    },
    register() {
      this.$http.get('')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const resultArray = [];
        for (let key in data) {
          resultArray.push(data[key]);
        }
        this.users = resultArray;
      });
    }
  }
}
</script>
<style lang="scss">
</style>