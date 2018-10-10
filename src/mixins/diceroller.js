export default {
  methods: {
    dice() {
      let rollResult = Math.floor(Math.random() * 10) + 1;
      return rollResult;
    },
    rollDice(num) {
      let results = [];
      for(let index = 0;index < num;index++) {
        results.push(this.dice());
      }
      console.log("meee", results)
    },
    totalScoreRoll(ability, skill, hunger) {
      let regular = ability + skill - hunger;
      let result = this.rollDice(regular);
      let resultHunger = this.rollDice(hunger);
      return result + resultHunger;
    }
  }
}