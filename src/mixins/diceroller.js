export default {
  methods: {
    dice() {
      let rollResult = Math.floor(Math.random() * 10) + 1;
      return rollResult;
    },
    rollDice(num) {
      let results = [];
      for(let index = 0;index < num;index++) {
        let outcome = '';
        let diceRolling = this.dice();
        if(diceRolling == 10) {
          outcome = "critical success";
        } else if ((diceRolling > 5) && (diceRolling < 10)) {
          outcome = "success";
        } else {
          outcome = "failure"
        }
        results.push(outcome);
      }
      return results;
    },
    rollHungerDice(num) {
      let results = [];
      for(let index = 0;index < num;index++) {
        let outcome = '';
        let diceRolling = this.dice();
        if(diceRolling == 10) {
          outcome = "critical success";
        } else if ((diceRolling > 5) && (diceRolling < 10)) {
          outcome = "success";
        } else if (diceRolling == 1) {
          outcome = "critical failure"
        } else {
          outcome = "failure"
        }
        results.push(outcome);
      }
      return results;
    }
  }
}