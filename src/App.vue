<template>
  <div id="app">
    <div class="form-group">
      <label>Username</label>
      <input class="form-control" type="text" v-model="user.username">
    </div>
    <div class="form-group">
      <label>Mail</label>
      <input class="form-control" type="text" v-model="user.email">
    </div>
    <button class="submit-button" @click.prevent="submit">Submit</button>
    <button class="get-button" @click.prevent="getData">GetData</button>
    <ul>
      <li v-for="(item, index) in users" :key="index">{{ item.username }} - {{ item.email }} - <ul><li v-for="(character, i) in item.characters" :key="i">{{ character.name }}</li></ul></li>
    </ul>
    <component :is="selected"></component>
  </div>
</template>
<script>
import appCharacter from './components/Character.vue';
import appCharacterCreation from './components/CharacterCreation.vue';

export default {
  data() {
    return {
      selected: appCharacter,
      user: {
        username: '',
        email: '',
        password: '',
        characters: [
          {
            name: 'ManoloCabezabolo'
          }
        ]
      },
      users: []
    }
  },
  methods: {
    submit() {
      this.$http.post('', this.user)
        .then(response => {
          console.log(response);
        }, error => {
          console.log(error);
        });
    },
    getData() {
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