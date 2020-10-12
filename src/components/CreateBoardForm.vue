<template>
  <v-flex sm3>
    <v-card class="ma-2 pa-3">
      <v-card-title primary-title style="flex-direction: column;">
        <div class="headline">Create a Board</div>
        <div>
          <v-form
            v-if="!creatingBoard"
            v-model="valid"
            @submit.prevent="onCreateBoard"
            >
            <v-text-field
              v-model="board.name"
              :rules="notemptyrules"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="board.backgroundUrl"
              :rules="notemptyrules"
              label="Background"
              required
            ></v-text-field>
            <v-btn type="submit" :disabled="!valid" color="secondary" text>Create</v-btn>
          </v-form>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ['creatingBoard', 'createBoard'],
  data: () => ({
    valid: false,
    board: {
      name: '',
      backgroundUrl: '',
    },
    notemptyrules: [(value) => !!value || 'cannot be empty'],
  }),
  methods: {
    async onCreateBoard() {
      if (this.valid) {
        await this.createBoard(this.board);
        this.board = {
          name: '',
          backgroundUrl: '',
        };
      }
    },
  },
};
</script>
