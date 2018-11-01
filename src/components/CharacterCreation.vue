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
        <br>
        <select>
          <option>( 1-2-3 / 2-3-4 / 2-2-3 )</option>
          <option>( 1-2-3 / 2-2-3 / 2-3-4)</option>
          <option>( 2-3-4 / 1-2-3 / 2-2-3 )</option>
          <option>( 2-3-4 / 2-2-3 / 1-2-3 )</option>
          <option>( 2-2-3 / 1-2-3 / 2-3-4 )</option>
          <option>( 2-2-3 / 2-3-4 / 1-2-3 )</option>
        </select>
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
              <button @click.prevent="addAttrDots(item, 5)">+</button>
            <button @click.prevent="removeAttrDots(item, 5)">-</button>
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
              <button @click.prevent="addSkillDots(item, 5)">+</button>
              <button @click.prevent="removeSkillDots(item, 5)">-</button>
            </div>
            <div class="add-specialty">
              <input v-model="item.newSpecialty"/>
              <button @click.prevent="addSpecialty(item.newSpecialty, item.specialties)">Add Specialty</button>
            </div>
          </li>
        </ul>
      </div>
      <div class="health-willpower">
        <div class="health-track">
          <div class="ability-dots">
            <ul>
              <li class="ability-black-dot" v-for="(blackdot, iblack) in trackdots(health.score).black" :key="iblack"></li>
            </ul>
            <ul>
              <li class="ability-white-dot" v-for="(whitedot, iwhite) in trackdots(health.score).white" :key="iwhite"></li>
            </ul>
          </div>
          <div class="ability-points-mod">
              <button @click.prevent="addSkillDots(health.score, 10)">+</button>
              <button @click.prevent="removeSkillDots(health.score, 10)">-</button>
            </div>
        </div>
        <div class="willpower-track">
          <div class="ability-dots">
            <ul>
              <li class="ability-black-dot" v-for="(blackdot, iblack) in trackdots(willpower.score).black" :key="iblack"></li>
            </ul>
            <ul>
              <li class="ability-white-dot" v-for="(whitedot, iwhite) in trackdots(willpower.score).white" :key="iwhite"></li>
            </ul>
          </div>
          <div class="ability-points-mod">
              <button @click.prevent="addSkillDots(willpower.score, 10)">+</button>
              <button @click.prevent="removeSkillDots(willpower.score, 10)">-</button>
            </div>
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
      health: {
        score: 6
      },
      willpower: {
        score: 6
      },
      humanity: 7,
      hunger: 3,
      gen: 1,
      skillPoints: 35,
      attributePoints: 13,
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
      provSpecialty: '',
      skillset: {
        athletics: {
          text: "Athletics",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        brawl: {
          text: "Brawl",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        craft: {
          text: "Craft",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        drive: {
          text: "Drive",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        firearms: {
          text: "Firearms",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        larceny: {
          text: "Larceny",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        melee: {
          text: "Melee",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        stealth: {
          text: "Stealth",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        survival: {
          text: "Survival",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        animalKen: {
          text: "Animal Ken",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        etiquette: {
          text: "Etiquette",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        insight: {
          text: "Insight",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        intimidation: {
          text: "Intimidation",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        leadership: {
          text: "Leadership",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        performance: {
          text: "Performance",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        persuasion: {
          text: "Persuasion",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        streetwise: {
          text: "Streetwise",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        subterfuge: {
          text: "Subterfuge",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        academics: {
          text: "Academics",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        awareness: {
          text: "Awareness",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        finance: {
          text: "Finance",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        investigation: {
          text: "Investigation",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        medicine: {
          text: "Medicine",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        occult: {
          text: "Occult",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        politics: {
          text: "Politics",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        science: {
          text: "Science",
          score: 0,
          newSpecialty: '',
          specialties: []
        },
        technology: {
          text: "Technology",
          score: 0,
          newSpecialty: '',
          specialties: []
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
    trackdots(num) {
      return {
        white: 10 - num,
        black: num
      }
    },
    addSkillDots(num, max, points) {
      if((num.score < max) && (this.skillPoints > 0)) {
        num.score++;
        this.skillPoints--;
        console.log(num.text, num.score, this.skillPoints);
      }
    },
    removeSkillDots(num) {
      if(num.score > 0) {
        num.score--;
        this.skillPoints++;
        console.log(num.text, num.score, this.skillPoints);
      }
    },
    addAttrDots(num, points) {
      if((num.score < 5) && (this.attributePoints > 0)) {
        num.score++;
        this.attributePoints--;
        console.log(num.text, num.score, this.attributePoints);
      }
    },
    removeAttrDots(num) {
      if(num.score > 0) {
        num.score--;
        this.attributePoints++;
        console.log(num.text, num.score, this.attributePoints);
      }
    },
    addSpecialty(term, arr) {
      console.log(arr);
      console.log(term);
      arr.push("specialty: " + term);
    }
  },
  computed: {
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
  width: 100%;
  max-width: 955px;
  margin: 0 auto;
  h3 {
    text-align: center;
  }
  ul {
    list-style-type: none;
    padding-left: 0;
    margin: 10px 20px;
    .ability-score {
      float: left;
      width: calc(30% - 40px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
      .ability-name {
        width: 130px;
        float: left;
        height: 30px;
        line-height: 30px;
      }
      .ability-dots {
        width: 55px;
        height: 12px;
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