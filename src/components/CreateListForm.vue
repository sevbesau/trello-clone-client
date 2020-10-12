<template>
  <v-flex sm3>
    <v-card class="ma-2 pa-3">
      <v-card-title primary-title style="flex-direction: column;">
        <div class="headline">Create a List</div>
        <div>
          <v-form
            v-if="!creatingList"
            v-model="valid"
            @submit.prevent="onCreateList"
            >
            <v-text-field
              v-model="list.name"
              :rules="notemptyrules"
              label="Name"
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
  props: ['creatingList', 'createList'],
  data: () => ({
    valid: false,
    list: {
      name: '',
    },
    notemptyrules: [(value) => !!value || 'cannot be empty'],
  }),
  methods: {
    async onCreateList() {
      if (this.valid) {
        await this.createList(this.list);
        this.list = {
          name: '',
        };
      }
    },
  },
};
</script>
