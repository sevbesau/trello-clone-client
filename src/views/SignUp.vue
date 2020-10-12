<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-form
          v-if="!loading"
          v-model="valid"
          @submit.prevent="signup"
          >
          <v-text-field
            v-model="user.username"
            :rules="notemptyrules"
            label="username"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            :rules="notemptyrules"
            label="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="notemptyrules"
            label="password"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.confirmpassword"
            :rules="confirmpasswordrules"
            label="confirm password"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.imageUrl"
            :rules="notemptyrules"
            label="imageurl"
            required
          ></v-text-field>
          <v-btn :disabled="!valid" type="submit">sign up!</v-btn>
        </v-form>
        <v-progress-circular
          v-if="loading"
          :size="70"
          :width="7"
          indeterminate color="primary"
        ></v-progress-circular>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'signup',
  computed: {
    ...mapState('users', { loading: 'isCreatePending' }),
  },
  data: (vm) => ({
    valid: false,
    user: {
      email: '',
      password: '',
      confirmpassword: '',
      username: '',
      imageUrl: '',
    },
    notemptyrules: [(value) => !!value || 'cannot be empty'],
    confirmpasswordrules: [(confirmpassword) => confirmpassword === vm.user.password || 'passwords must match'],
  }),
  methods: {
    signup() {
      if (this.valid) {
        const { User } = this.$FeathersVuex.api;
        const newUser = new User(this.user);
        newUser.save().then(() => {
          this.$router.push('/login');
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
