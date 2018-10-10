export default {
  methods: {
    dice() {
      console.log('meh');
      let rollResult = Math.floor(Math.random() * 10) + 1;
      return rollResult;
    }
  }
}