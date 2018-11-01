<template>
  <div>
    <h1>Character List</h1>
    <ul>
      <div class="list-character" v-for="(item, index) in characterList" @click="getToCharacter()" :key="index">
        <img :src="item.portrait"/>
        <div>
          <ul>
            <li>Character Name: {{ item.name }}</li>
            <li>Clan: {{ item.clan }}</li>
            <li>Chronicle: {{ item.chronicle }}</li>
          </ul>
        </div>
      </div>
    </ul>
  </div>
</template>
<script>
  export default {
    data:() => ({
      characterList: [
        {
          name: "Veraudo",
          chronicle: "Atlantic City By Night",
          clan: "Mamporrero",
          portrait: "http://sketchoholic.com/uploads/userfiles/11182/7da7a18174_vampire1-smallest.jpg"
        },
        {
          name: "Jeniviva",
          chronicle: "Atlantic City By Night",
          clan: "Mamporrero",
          portrait: "http://sketchoholic.com/uploads/userfiles/11182/7da7a18174_vampire1-smallest.jpg"
        }
      ]
    }),
    methods: {
      getToCharacter() {
        this.$router.push('/character-view');
      }
    }
  }
</script>
<style lang="scss">
.list-character {
  padding: 10px;
  margin: 10px;
  float: left;
  border: 1px solid black;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    width: 90px;
  }
}
</style>