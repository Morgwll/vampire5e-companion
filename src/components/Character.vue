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
          <button class="roll" @click.prevent="openRollDialogue(item.text, item.score)">
            Roll
          </button>
        </li>
        
      </ul>
    </div>
    <div class="roller-modal" v-show="openRollModal">
      <div class="roller-modal-dialogue">
        <div class="close" @click.prevent="closeRollDialogue">
          X
        </div>
        <div class="roll-dialogue">
          <select v-model="statRoll">
            <option  disabled value="">-- Attribute select --</option>
            <option v-for="(item, i) in characterSheet.abilityset" :key="i" :statRoll="item.score">{{ item.score }}</option>
          </select>
          + {{ skillName }}
          <button @click.prevent="totalScoreRoll(statRoll, skillRoll, characterSheet.hunger)">Roll</button>
          {{ statRoll }}, {{ skillRoll }}, {{ characterSheet.hunger}}
        </div>
        <div class="roll-result">
          Stat: {{ statRoll }}, Skill: {{ skillRoll }}, Hunger: {{ characterSheet.hunger }}
          <ul class="regular-roll-result">
            <li v-for="(item, index) in totalRegularRoll" :key="index">{{ item }}</li>
          </ul>
          <ul class="hunger-roll-result">
            <li v-for="(item, index) in totalHungerRoll" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>
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
      characterSheet: char,
      statRoll: null,
      skillRoll: null,
      skillName: null,
      totalRegularRoll: [],
      totalHungerRoll: [],
      openRollModal: false
    }
  },
  methods: {
    skilldots(num) {
      return {
        white: 5 - num,
        black: num
      }
    },
    openRollDialogue(name, arg) {
      this.openRollModal = true;
      this.skillName = name;
      this.skillRoll = arg;
    },
    closeRollDialogue() {
      this.openRollModal = false;
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
.roller-modal {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0,0,0,.8);
  &-dialogue {
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 4px;
    width: 300px;
    height: 200px;
    position: relative;
    margin: calc(50% - 100px) auto;
  }
}

</style>