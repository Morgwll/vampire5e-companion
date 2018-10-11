<template>
  <div>
    <div class="abilities">
      <ul>
        <li class="ability-score" v-for="(item, index) in characterSheet.abilityset" :key="index">
          <div class="ability-name">{{ item.text }}</div>
          <div class="ability-dots">
            <ul>
              <li class="ability-black-dot" v-for="(blackdot, iblack) in skilldots(item.score).black" :key="iblack"></li>
            </ul>
            <ul>
              <li class="ability-white-dot" v-for="(whitedot, iwhite) in skilldots(item.score).white" :key="iwhite"></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="abilities">
      <ul>
        <li class="ability-score" v-for="(item, index) in characterSheet.skillset" :key="index">
          <div class="ability-name">{{ item.text }}</div>
          <div class="ability-dots">
            <ul>
              <li class="ability-black-dot" v-for="(blackdot, iblack) in skilldots(item.score).black" :key="iblack"></li>
            </ul>
            <ul>
              <li class="ability-white-dot" v-for="(whitedot, iwhite) in skilldots(item.score).white" :key="iwhite"></li>
            </ul>
          </div>
          <button @click.prevent="totalScoreRoll(4, item.score, characterSheet.hunger)">Roll</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import diceroller from '../mixins/diceroller.js';
import char from '../data/char-EN.json';

export default {
  mixins: [diceroller],
  data() {
    return {
      characterSheet: char
    }
  },
  methods: {
    skilldots(num) {
      return {
        white: 5 - num,
        black: num
      }
    }
  }
}
</script>
<style lang="scss">
.abilities {
  ul {
    list-style-type: none;
    .ability-score {
      .ability-name {
        width: 150px;
        float: left;
      }
      .ability-dots {
        width: 150px;
        height: 30px;
        ul {
          .ability-black-dot, .ability-white-dot {
            border-radius: 50%;
            background-color: #000;
            width: 5px;
            height: 5px;
            border: 1px solid #000;
            margin: 2px;
            float: left;
          }
          .ability-white-dot {
            background-color: #fff;
          }
        }
      }
    }
  }
}

</style>