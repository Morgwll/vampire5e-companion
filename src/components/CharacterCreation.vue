<template>
  <div>
    <div class="character-info">
      <div>{{ name.text }}<input v-model="name.value"></div>
      <div>{{ chronicle.text }}<input v-model="chronicle.value"></div>
      <div>{{ sire.text }}<input v-model="sire.value"></div>
      <div>{{ concept.text }}<input v-model="concept.value"></div>
      <div>{{ ambition.text }}<input v-model="ambition.value"></div>
      <div>{{ desire.text }}<input v-model="desire.value"></div>
      <div>{{ predator.text }}
        <select>
          <option v-for="(item, index) in predator.value" :key="index">{{ item.text }}</option>
        </select>
      </div>
      <div>{{ clan.text }}
        <select>
          <option v-for="(item, index) in clan.value" :key="index">{{ item.text }}</option>
        </select>
      </div>
      <div>{{ generation.text }}
        <select>
          <option v-for="(item, index) in generation.value" :key="index">{{ item.text }}</option>
        </select>
      </div>
    </div>
    <div class="points-container">
      <div class="abilities">
        <h3>Attributes</h3>
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
            <div class="ability-points-mod">
              <button @click.prevent="addDots(item, attributepoints)">+</button>
            <button @click.prevent="removeDots(item, attributepoints)">-</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="abilities">
        <h3>Skills</h3>
        <ul>
          <li class="ability-score" v-for="(item, index) in skillset" :key="index">
            <div class="ability-name">{{ item.text }}</div>
            <div class="ability-dots">
              <ul>
                <li class="ability-black-dot" v-for="(blackdot, iblack) in skilldots(item.score).black" :key="iblack"></li>
              </ul>
              <ul>
                <li class="ability-white-dot" v-for="(whitedot, iwhite) in skilldots(item.score).white" :key="iwhite"></li>
              </ul>
            </div>
            <div class="ability-points-mod">
              <button @click.prevent="addDots(item, skillpoints)">+</button>
              <button @click.prevent="removeDots(item, skillpoints)">-</button>
            </div>
          </li>
        </ul>
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
      name: {
        text: "Name",
        value: ""
      },
      chronicle: {
        text: "Chronicle",
        value: ""
      },
      sire: {
        text: "Sire",
        value: ""
      },
      concept: {
        text: "Concept",
        value: ""
      },
      ambition: {
        text: "Ambition",
        value: ""
      },
      desire: {
        text: "Desire",
        value: ""
      },
      predator: {
        text: "Predator",
        value: {
          none: {
            text: "-- Select Predator --",
            value: 0
          },
          alleycat: {
            text: "Alleycat",
            value: 1
          },
          bagger: {
            text: "Bagger",
            value: 2
          },
          bloodleech: {
            text: "Blood Leech",
            value: 3
          },
          cleaver: {
            text: "Cleaver",
            value: 4
          },
          consensualist: {
            text: "Consensualist",
            value: 5
          },
          farmer: {
            text: "Farmer",
            value: 6
          },
          osiris: {
            text: "Osiris",
            value: 7
          },
          sandman: {
            text: "Sandman",
            value: 8
          },
          scenequeen: {
            text: "Scene Queen",
            value: 9
          },
          siren: {
            text: "Siren",
            value: 10
          },
        }
      },
      clan: {
        text: "Clan",
        value: {
          none: {
            text: "-- Select Clan --",
            value: 0
          },
          nosferatu: {
            text: "Nosferatu",
            value: 1
          },
          toreador: {
            text: "Toreador",
            value: 2
          },
          gangrel: {
            text: "Gangrel",
            value: 3
          },
          malkavian: {
            text: "Malkavian",
            value: 4
          },
          brujah: {
            text: "Brujah",
            value: 5
          },
          tremere: {
            text: "Tremere",
            value: 6
          },
          ventrue: {
            text: "Ventrue",
            value: 7
          },
          caitiff: {
            text: "Caitiff",
            value: 8
          },
          thinblood: {
            text: "Thin-Blood",
            value: 9
          },
        }
      },
      generation: {
        text: "Generation",
        value: {
          none: {
            text: '-- Select Generation --',
            gen: 0
          },
          fifteenth: {
            text: 'Fifteenth',
            gen: 15
          },
          fourteeth: {
            text: 'Fourteenth',
            gen: 14
          },
          thirteenth: {
            text: 'Thirteenth',
            gen: 13
          },
          twelfth: {
            text: 'Twelfth',
            gen: 12
          },
          eleventh: {
            text: 'Eleventh',
            gen: 11
          },
          tenth: {
            text: 'Tenth',
            gen: 10
          },
        }
      },
      health: 6,
      willpower: 5,
      humanity: 7,
      hunger: 3,
      gen: 1,
      skillpoints: 35,
      attributepoints: 13,
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
        athletics: {
          text: "Athletics",
          score: 0,
          ability: ""
        },
        brawl: {
          text: "Brawl",
          score: 0,
          ability: ""
        },
        craft: {
          text: "Craft",
          score: 0,
          ability: ""
        },
        drive: {
          text: "Drive",
          score: 0,
          ability: ""
        },
        firearms: {
          text: "Firearms",
          score: 0,
          ability: ""
        },
        larceny: {
          text: "Larceny",
          score: 0,
          ability: ""
        },
        melee: {
          text: "Melee",
          score: 0,
          ability: ""
        },
        stealth: {
          text: "Stealth",
          score: 0,
          ability: ""
        },
        survival: {
          text: "Survival",
          score: 0,
          ability: ""
        },
        animalKen: {
          text: "Animal Ken",
          score: 0,
          ability: ""
        },
        etiquette: {
          text: "Etiquette",
          score: 0,
          ability: ""
        },
        insight: {
          text: "Insight",
          score: 0,
          ability: ""
        },
        intimidation: {
          text: "Intimidation",
          score: 0,
          ability: ""
        },
        leadership: {
          text: "Leadership",
          score: 0,
          ability: ""
        },
        performance: {
          text: "Performance",
          score: 0,
          ability: ""
        },
        persuasion: {
          text: "Persuasion",
          score: 0,
          ability: ""
        },
        streetwise: {
          text: "Streetwise",
          score: 0,
          ability: ""
        },
        subterfuge: {
          text: "Subterfuge",
          score: 0,
          ability: ""
        },
        academics: {
          text: "Academics",
          score: 0,
          ability: ""
        },
        awareness: {
          text: "Awareness",
          score: 0,
          ability: ""
        },
        finance: {
          text: "Finance",
          score: 0,
          ability: ""
        },
        investigation: {
          text: "Investigation",
          score: 0,
          ability: ""
        },
        medicine: {
          text: "Medicine",
          score: 0,
          ability: ""
        },
        occult: {
          text: "Occult",
          score: 0,
          ability: ""
        },
        politics: {
          text: "Politics",
          score: 0,
          ability: ""
        },
        science: {
          text: "Science",
          score: 0,
          ability: ""
        },
        technology: {
          text: "Technology",
          score: 0,
          ability: ""
        }
      },
      disciplines: {
        auspex: {
          level1: "",
          level2: "",
          level3: "",
          level4: "",
          level5: ""
        },
        animalism: {
          level1: "",
          level2: "",
          level3: "",
          level4: "",
          level5: ""
        },
        bloodSorcery: {
          level1: "",
          level2: "",
          level3: "",
          level4: "",
          level5: ""
        },
        celerity: {
          level1: "",
          level2: "",
          level3: "",
          level4: "",
          level5: ""
        },
        domination: {
          level1: "",
          level2: "",
          level3: "",
          level4: "",
          level5: ""
        },
        fortitude: {
          level1: "",
          level2: "",
          level3: "",
          level4: "",
          level5: ""
        },
        obfuscation: {
          level1: "",
          level2: "",
          level3: "",
          level4: "",
          level5: ""
        },
        potency: {
          level1: "",
          level2: "",
          level3: "",
          level4: "",
          level5: ""
        },
        presence: {
          level1: "",
          level2: "",
          level3: "",
          level4: "",
          level5: ""
        },
        protean: {
          level1: "",
          level2: "",
          level3: "",
          level4: "",
          level5: ""
        }
      }
    }
  },
  methods: {
    skilldots(num) {
      return {
        white: 5 - num,
        black: num
      }
    },
    addDots(num, points) {
      if((num.score < 5) && (points > 0)) {
        num.score++;
        points--;
        console.log(num.text, num.score, points);
      }
    },
    removeDots(num, points) {
      if(num.score > 0) {
        num.score--;
        points++;
        console.log(num.text, num.score, points);
      }
    },
    generationExp(gen) {
      let skillpoints = 0;
      let bloodPotency = 0
      if(gen >= 14) {
        bloodPotency = 0;
      } else if(gen == 12 || gen == 13) {
        bloodPotency = 1;
        skillpoints = 15;
      } else if(gen == 11 || gen == 10) {
        bloodPotency = 2;
        skillpoints = 35;
        this.humanity--;
      }
      return {
        skillpoints,
        bloodPotency
      };
    }
  }
}
</script>
<style lang="scss">
.points-container {
  width: 100%;
  max-width: 1030px;
}
.abilities {
  height: 115px;
  h3 {
    text-align: center;
  }
  ul {
    list-style-type: none;
    .ability-score {
      .ability-name {
        width: 105px;
        float: left;
        height: 30px;
        line-height: 30px;
      }
      .ability-dots {
        width: 140px;
        height: 30px;
        float: left;
        ul {
          .ability-black-dot, .ability-white-dot {
            border-radius: 50%;
            background-color: #000;
            width: 5px;
            height: 5px;
            border: 1px solid #000;
            margin: 13px 2px;
            float: left;
          }
          .ability-white-dot {
            background-color: #fff;
          }
        }
      }
      .ability-points-mod {
        width: 50px;
        height: 30px;
        float: left;
        line-height: 30px;
        padding-right: 30px;
      }
    }
  }
}

</style>