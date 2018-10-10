<template>
  <div>
    Character stuff
    <div class="skill">
      <div class="skill-name">Persuasion</div>
      <ul>
        <li v-for="(item, i) in skilldots(4).black" :key="i">
          black
        </li>
        <li v-if="skilldots(4).white > 0" v-for="(item, index) in skilldots(4).white" :key="index">
          white
        </li>
      </ul>
      <button @click.prevent="rollDice(4)">Roll</button>
    </div>
  </div>
</template>
<script>
import diceroller from '../mixins/diceroller.js';
export default {
  mixins: [diceroller],
  methods: {
    data() {
      return {
        rollResult: []
      }
    },
    rollDice(num) {
      for(let index = 0;index < num;index++) {
        console.log(this);
        //this.rollResult.push("meh");
      }
    },
    skilldots(num) {
      return {
        white: 5 - num,
        black: num
      }
    }
  },
  watch: {
    rollResult() {
      console.log(this.rollresult);
    }
  }
}
</script>
<style lang="scss">
</style>