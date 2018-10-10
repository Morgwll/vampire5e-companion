<template>
  <div>
    <div class="abilities">
      <ul>
        <li class="ability-score" v-for="(item, index) in abilityset" :key="index">
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
    <div class="skill">
      <div class="skill-name">Persuasion</div>
      <button @click.prevent="totalScoreRoll(4, 3, hunger)">Roll</button>
    </div>
  </div>
</template>
<script>
import diceroller from '../mixins/diceroller.js';

export default {
  mixins: [diceroller],
  data() {
    return {
      hunger: 3,
      abilityset: {
        strength: {
          text: "Strength",
          score: 1
        },
        dexterity: {
          text: "Dexterity",
          score: 1
        },
        stamina: {
          text: "Stamina",
          score: 1
        },
        charisma: {
          text: "Charisma",
          score: 1
        },
        manipulation: {
          text: "Manipulation",
          score: 1
        },
        composure: {
          text: "Composure",
          score: 1
        },
        intelligence: {
          text: "Intelligence",
          score: 1
        },
        wits: {
          text: "Wits",
          score: 1
        },
        resolve: {
          text: "Resolve",
          score: 1
        }
      },
      skillset: {
        athletics: 0,
        brawl: 0,
        craft: 0,
        drive: 0,
        firearms: 0,
        larceny: 0,
        melee: 0,
        stealth: 0,
        survival: 0,
        animalKen: 0,
        etiquette: 0,
        insight: 0,
        intimidation: 0,
        leadership: 0,
        performance: 0,
        persuasion: 0,
        streetwise: 0,
        subterfuge: 0,
        academics: 0,
        awareness: 0,
        finance: 0,
        investigation: 0,
        medicine: 0,
        occult: 0,
        politics: 0,
        science: 0,
        technology: 0
      },
      disciplines: {
        auspex: 0,
        animalism: 0,
        bloodSorcery: 0,
        celerity: 0,
        domination: 0,
        fortitude: 0,
        obfuscation: 0,
        potency: 0,
        presence: 0,
        protean: 0,
      }
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
      border: 1px solid #c1c1c1;
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