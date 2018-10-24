<template>
  <div>
      Register
      <div class="form-group">
        <label>Choose Username: </label>
        <input class="form-control" type="text" v-model="username">
        <div class="required-field" v-if="required(username)"></div>
      </div>
      <div class="form-group">
        <label>Enter your email: </label>
        <input class="form-control" type="text" v-model="email">
        <div class="required-field" v-if="required(email)"></div>
      </div>
      <div class="form-group">
        <label>Enter your password: </label>
        <input class="form-control" type="password" v-model="password">
        <div class="required-field" v-if="required(password)"></div>
      </div>
      <div class="form-group">
        <label>Re-enter your password: </label>
        <input class="form-control" type="password" v-model="secondPassword">
        <div class="required-field" v-if="required(secondPassword)"></div>
      </div>
      <div>{{ message }}</div>
      <button class="submit-button" @click.prevent="submit">Submit</button>
      <button class="get-button" @click.prevent="compareData">GetData</button>
      <hr>
      {{ users }}
  </div>
</template>
<script>
export default {
  data: () => ({
    formChecked: false,
    username: '',
    email: '',
    password: '',
    secondPassword: '',
    message: '',
    user: {
      username: '',
      email: '',
      password: '',
    },
    users: null
  }),
  methods: {
    compareData() {
      console.log("the users", this.users.body);
      for (let item in this.users.body) {
        console.log(item);
      }
    },
    submit() {
      this.formChecked = true;
      console.log("the greenlight response", greenLight);
      if(greenLight == "good") {
        this.user.username = this.username;
        this.user.email = this.email;
        this.user.password = this.password;
        this.$http.post('', this.user)
          .then(response => {
            console.log(response);
          }, error => {
            console.log(error);
          });
      } else {
        this.message = greenLight;
      }
    },
    required(missing) {
      if((missing == null) && (this.formChecked !== false)) {
        return true;
      }
    }
  },
  created() {
    this.$http.get('')
    .then(response => {
      console.log(response);
      return response;
    })
    .then(data => {
      console.log("the data", data.body)
      this.users = data;
    })
  },
  watch: {
    secondPassword() {
      if(this.secondPassword != this.password) {
        this.message = "Passwords do not match";
      } else {
        this.message = "";
      }
    },
    password() {
      if(this.secondPassword != this.password) {
        this.message = "Passwords do not match";
      } else {
        this.message = "";
      }
    }
  }
}
</script>
<style lang="scss">
</style>