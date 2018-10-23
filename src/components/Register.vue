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
      <button class="get-button" @click.prevent="getData">GetData</button>
      <hr>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      users: [],
      response: ''
    }
  },
  methods: {
    getData() {
      this.$http.get('')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const resultArray = [];
        for (let key in data) {
          resultArray.push(data[key]);
        }
        this.users = resultArray;
      });
    },
    compareData() {
      let response = '';
      this.$http.get('')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const resultArray = [];
        for (let key in data) {
          resultArray.push(data[key]);
        }
        this.users = resultArray;
        this.response = "meeeh";
        console.log(resultArray);
        for(let i = 0;resultArray.length > i; i++) {
          console.log("dos veces");
          console.log(resultArray[i].username);
          if(resultArray[i].username == this.username) {
            console.log("username in use", this.username)
            response = "username taken";
          } else if(resultArray[i].email == this.email) {
            console.log("email in use")
            response = "email already in use";
          } else {
            console.log("no se");
            response = "good";
          }
        }
      });
      return response;
    },
    submit() {
      let greenLight = this.compareData();
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