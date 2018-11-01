<template>
  <div id="app">
    <app-header/>
    <hr>
    <router-view></router-view>
  </div>
</template>
<script>
import appHeader from './components/Header.vue';

export default {
  components: {
    appHeader
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