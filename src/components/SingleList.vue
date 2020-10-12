<template>
  <v-card class="ma-2">
    <v-card-title primary-title>
      <div class="headline">{{list.name}}</div>
    </v-card-title>
    <v-card-actions>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['list', 'createCard', 'creatingCard', 'listId', 'boardId'],
  data() {
    return {
      valid: false,
      card: {
        title: '',
        description: '',
        members: [],
      },
      notemptyrules: [(value) => !!value || 'cannot be empty'],
    };
  },
  methods: {
    async onCreateCard() {
      if (this.valid) {
        this.card.boardId = this.boardId;
        this.card.listId = this.listId;
        await this.createCard(this.card);
        this.card = {
          title: '',
          description: '',
          members: [],
          boardId: '',
          listId: '',
        };
      }
    },
  },
};
</script>
