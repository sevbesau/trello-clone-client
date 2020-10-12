<template>
  <v-flex sm12 pa-2>
    <v-card>
      <v-card-title primary-title>
        <div v-if="!creatingCard">
          <div class="headline">Create Card</div>
          <v-form
            v-model="valid"
            @submit.prevent="createCard"
            >
            <v-text-field
              v-model="card.title"
              :rules="notEmptyRules"
              label="Title"
              required
            ></v-text-field>
            <v-btn type="submit" :disabled="!valid" color="secondary" text>Create</v-btn>
          </v-form>
        </div>
        <v-progress-circular
          v-else
          :size="70"
          :width="7"
          indeterminate color="primary"
        ></v-progress-circular>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'create-card',
  props: ['listId', 'boardId'],
  data: () => ({
    valid: false,
    creatingCard: false,
    card: {
      title: '',
      members: [],
    },
    notEmptyRules: [(value) => !!value || 'Cant be empty'],
  }),
  methods: {
    async createCard() {
      if (this.valid) {
        this.card.listId = this.listId;
        this.card.boardId = this.boardId;
        const { Card } = this.$FeathersVuex.api;
        const newCard = new Card(this.card);
        this.creatingCard = true;
        await newCard.save();
        this.creatingCard = false;
        this.card = {
          title: '',
          members: [],
        };
      }
    },
  },
};
</script>
