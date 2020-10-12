<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <CreateBoardForm
          :creatingBoard="creatingBoard"
          :createBoard="createBoard"
        />
        <v-flex v-for="board in boards" :key="board._id" sm3>
          <SingleBoard :board="board" />
        </v-flex>
        <v-progress-circular
          v-if="areBoardsLoading || creatingBoard"
          :size="70"
          :width="7"
          indeterminate color="primary"
        ></v-progress-circular>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import CreateBoardForm from '../components/CreateBoardForm.vue';
import SingleBoard from '../components/SingleBoard.vue';

export default {
  name: 'boards',
  components: {
    CreateBoardForm,
    SingleBoard,
  },
  data: () => ({
    valid: false,
    board: {
      name: '',
      backgroundUrl: '',
    },
    notemptyrules: [(value) => !!value || 'cannot be empty'],
  }),
  computed: {
    ...mapState('auth', { user: 'payload' }),
    ...mapState('boards', {
      areBoardsLoading: 'isFindPending',
      creatingBoard: 'isCreatePending',
    }),
    ...mapGetters('boards', { findBoardsInStore: 'find' }),
    boards() {
      return this.user ? this.findBoardsInStore({
        query: { ownerId: this.user.user._id }, // eslint-disable-line
      }).data : [];
    },
  },
  methods: {
    ...mapActions('boards', { findBoards: 'find' }),
    createBoard(board) {
      const { Board } = this.$FeathersVuex.api;
      const newBoard = new Board(board);
      newBoard.save();
    },
  },
  mounted() {
    this.findBoards();
  },
};
</script>

<style scoped>

</style>
