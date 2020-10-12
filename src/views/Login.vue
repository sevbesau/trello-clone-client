<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-form
          v-if="!loading"
          v-model="valid"
          @submit.prevent="login"
          >
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
          <v-btn :disabled="!valid" type="submit">log in!</v-btn>
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
import { mapState, mapActions } from 'vuex';

export default {
  name: 'login',
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),
  },
  data: () => ({
    valid: false,
    user: {
      email: '',
      password: '',
    },
    notemptyrules: [(value) => !!value || 'cannot be empty'],
  }),
  methods: {
    ...mapActions('auth', ['authenticate']),
    login() {
      if (this.valid) {
        this.authenticate({
          strategy: 'local',
          ...this.user,
        }).then(() => {
          this.$router.push('/boards');
        }).catch((e) => {
          console.log('error', e);
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
