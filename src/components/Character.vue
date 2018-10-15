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
          <button class="roll" @click.prevent="openRollDialogue(item.text, item.score, item.specialties)">Roll</button>
        </li>
        
      </ul>
    </div>
    <div class="roller-modal" v-show="openRollModal">
      <div class="roller-modal-dialogue">
        <div class="roller-modal-close" @click.prevent="closeRollDialogue">
          X
        </div>
        <div class="roll-dialogue" v-if="displayRolls">
          <select v-model="statRoll">
            <option  disabled value="">-- Attribute select --</option>
            <option v-for="(item, i) in characterSheet.abilityset" :key="i" :value="item.score">Attribute: {{ item.text }}</option>
          </select>
          + {{ skillName }}
          <select v-model="specialty.name" v-if="specialty.length != 0">
            <option disabled value="">-- Specialty select --</option>
            <option v-for="(special, indx) in specialty" :key="indx" :value="1">Specialty: {{ special.name }}</option>
          </select>
          <button @click.prevent="totalScoreRoll(statRoll, skillRoll, characterSheet.hunger, specialty)">Roll</button>
        </div>
        <div class="roll-result" v-if="!displayRolls">
          <ul class="regular-roll-result">
            <li v-for="(item, index) in regularResult" :key="index">{{ item }}</li>
          </ul>
          <ul class="hunger-roll-result" v-if="hungerResult.length > 0">
            <li v-for="(item, index) in hungerResult" :key="index">{{ item }}</li>
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
      displayRolls: true,
      characterSheet: char,
      statRoll: null,
      specialty: [],
      skillRoll: null,
      skillName: null,
      openRollModal: false,
      regularResult: [],
      hungerResult: []
    }
  },
  methods: {
    skilldots(num) {
      return {
        white: 5 - num,
        black: num
      }
    },
    openRollDialogue(name, arg, spec) {
      this.statRoll = null;
      this.skillName = null;
      this.regularResult = [];
      this.hungerResult = [];
      this.openRollModal = true;
      this.specialty = spec;
      this.skillName = name;
      this.skillRoll = arg;
    },
    closeRollDialogue() {
      this.displayRolls = true;
      this.openRollModal = false;
    },
    totalScoreRoll(ability, skill, hunger, specialty) {
      this.displayRolls = false;
      let isSpecial = ''
      this.regularResult = [];
      this.hungerResult = [];
      if (specialty != '') {
        isSpecial = 1;
      }
      let maxDice = ability + skill + isSpecial;
      let regular = ability + skill + isSpecial - hunger;
      if (maxDice <= hunger) {
        hunger = maxDice;
      }
      let result = this.rollDice(regular);
      let resultHunger = this.rollHungerDice(hunger);
      this.regularResult = result;
      this.hungerResult = resultHunger;
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
    padding: 10px 28px 10px 10px;
    position: relative;
    margin: calc(50% - 100px) auto;
  }
  &-close {
    position: absolute;
    top: 6px;
    right: 10px;
    padding: 4px;
    cursor: pointer;
  }
  .regular-roll-result, .hunger-roll-result {
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .regular-roll-result li, .hunger-roll-result li {
    padding: 4px;
    color: #fff;
    font-weight: 700;
    width: auto;
    margin: 3px;
  }
  .regular-roll-result li {
    background-color: #000;
  }
  .hunger-roll-result li {
    background-color: #a00808;
  }
}

</style>