<template>
  <div>
    <v-app-bar
      dense
      light
    >
      <v-toolbar-title>Crello - Cheap Trello</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!user">
        <v-btn text :to="{name: 'signup'}">SIGNUP</v-btn>
        <v-btn text :to="{name: 'login'}">LOGIN</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
      <v-layout justify-contetn align-center>

        <h3>{{user.user.username}}</h3>
        <v-avatar :size="40">
          <img :src="user.user.imageUrl">
        </v-avatar>
      </v-layout>
        <v-btn text @click="logout">LOGOUT</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'navbar',
  computed: {
    ...mapState('auth', { user: 'payload' }),
  },
  methods: {
    ...mapActions('auth', { authLogout: 'logout' }),
    logout() {
      this.authLogout().then(() => this.$router.push('/login'));
    },
  },
};
</script>

<style scoped>
h3 {
  margin-right: 10px;
}
</style>
