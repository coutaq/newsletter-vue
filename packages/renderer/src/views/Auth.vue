<template>
  <div style="width:50ch" class="m-auto">
    <form
      v-on:keypress.enter="auth()"
      class="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label
          class="block text-gray-800 dark:text-gray-50 font-medium text-lg mb-2"
          for="username"
        >Логин или почта</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 dark:placeholder-gray-200 dark:bg-gray-700 dark:text-gray-50 text-gray-700 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="email@email.com"
          @input="updateForm('login', $event.target.value)"
          :value="form.login"
        />
        <p v-if="login_error" class="text-red-500 italic">{{ login_error }}</p>
      </div>

      <div class="mb-6">
        <label
          class="block text-gray-700 dark:text-gray-50 text-lg font-medium mb-2"
          for="password"
        >Пароль</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 dark:placeholder-gray-200 dark:bg-gray-700 dark:text-gray-50 text-gray-700 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          @input="updateForm('password', $event.target.value)"
          :value="form.password"
        />
        <p v-if="password_error" class="text-red-500 italic">{{ password_error }}</p>
      </div>
      <div class="flex items-center justify-between">
        <button
          @click="auth()"
          class="bg-pink-600 hover:bg-pink-700 text-gray-50 font-light tracking-wide py-2 px-4 mx-auto rounded focus:outline-none focus:shadow-outline"
          type="button"
        >Войти</button>
      </div>
    </form>
  </div>
</template>

<script lang= "ts">
import axios from 'axios';
export default {
  data() {
    return {
      form: {
        login: "",
        password: "",
      },
      login_error: null,
      password_error: null
    }
  },
  created() {
    const storedForm = this.openStorage()
    if (storedForm) {
      this.form = {
        ...this.form,
        ...storedForm
      }
    }
  },
  methods: {
    updateForm(input, value) {
      this.form[input] = value

      let storedForm = this.openStorage() // extract stored form
      if (!storedForm) storedForm = {} // if none exists, default to empty object

      storedForm[input] = value // store new value
      this.saveStorage(storedForm) // save changes into localStorage
    },
    openStorage() {
      return JSON.parse(localStorage.getItem('form'))
    },
    saveStorage(form) {
      localStorage.setItem('form', JSON.stringify(form))
    },

    auth() {
      console.log("auth")
      var self = this;
      axios
        .post('http://localhost:5000/auth', {
          login: self.form.login,
          password: self.form.password
        })
        .then(response => {
          self.login_error = null
          self.password_error = null
          var errors = response.data.errors
          var user = response.data.user
          if (errors) {
            self.login_error = errors.login
            self.password_error = errors.password
            return
          }
          localStorage.setItem('user', JSON.stringify(user))
          self.goToHome();
        }).catch(err => {
          console.error(err)
        });
    },
    goToHome() {
      this.$router.push("/home")
    }
  }
};
</script>

<style>
</style>