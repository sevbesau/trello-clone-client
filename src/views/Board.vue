<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap>
        <v-flex xs12 ma-3>
          <v-alert v-if="boardsError" type="error">
           boards: {{boardsError.message}}
          </v-alert>
        </v-flex>
        <v-flex xs12 ma-3>
          <v-alert v-if="listsError" type="error">
           lists: {{listsError.message}}
          </v-alert>
        </v-flex>
        <v-flex xs12 ma-3>
          <v-alert v-if="cardsError" type="error">
           cards: {{cardsError.message}}
          </v-alert>
        </v-flex>
        <v-flex sm12>
          <h2>{{ board.name }}</h2>
        </v-flex>
        <v-flex
          v-for="list in lists"
          :key="list._id" sm3>
          <v-card
            @dragover="setDroppingList($event, list)"
            class="ma-2"
            :class="{'green': droppingList == list}">
            <v-card-title>
              <v-layout column>
                <v-flex xs12>
                  <div class="headline">{{list.name}}</div>
                </v-flex>
                <v-flex
                  xs12
                  v-for="card in cardsByListId[list._id]"
                  :key="card._id"
                  class="pa-1">
                  <v-card
                    draggable="true"
                    @dragstart="startDraggingCard(card)"
                    @dragend="dropCard()">
                    <v-container fluid grid-list-lg>
                      <v-layout row>
                        <v-flex xs12>
                          <div class="headline">{{card.title}}</div>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-actions>
              <create-card
                :listId="list._id"
                :boardId="$route.params.id"
              />
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-progress-circular
          v-if="loadingLists || loadingBoard"
          :size="70"
          :width="7"
          indeterminate color="primary"
        ></v-progress-circular>
                <CreateListForm
          :creatingList="creatingList"
          :createList="createList"
        />
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';

import CreateListForm from '../components/CreateListForm.vue';
import CreateCard from '../components/CreateCard.vue';

export default {
  name: 'board',
  components: {
    CreateListForm,
    CreateCard,
  },
  data: () => ({
    board: {},
    list: {
      name: '',
    },
    draggingCard: null,
    droppingList: null,
    notemptyrules: [(value) => !!value || 'cannot be empty'],
  }),
  computed: {
    ...mapGetters('lists', { findListsInStore: 'find' }),
    ...mapGetters('cards', { findCardsInStore: 'find' }),
    ...mapState('boards', {
      loadingBoard: 'isGetPending',
      boardsError: 'errorOnGet',
    }),
    ...mapState('cards', {
      creatingCard: 'isCreatePending',
      cardsError: 'errorOnFind',
    }),
    ...mapState('lists', {
      loadingLists: 'isFindPending',
      creatingList: 'isCreatePending',
      listsError: 'errorOnFind',
    }),
    lists() {
      return this.findListsInStore({
        query: { boardId: this.$route.params.id },
      }).data;
    },
    cards() {
      return this.findCardsInStore({
        query: { boardId: this.$route.params.id },
      }).data;
    },
    cardsByListId() {
      return this.cards.reduce((byId, card) => {
        byId[card.listId] = byId[card.listId] || []; // eslint-disable-line
        byId[card.listId].push(card);
        return byId;
      }, {});
    },
  },
  methods: {
    ...mapActions('boards', { getBoard: 'get' }),
    ...mapActions('lists', { findLists: 'find' }),
    ...mapActions('cards', { findCards: 'find' }),
    createList(list) {
      const { List } = this.$FeathersVuex.api;
      const newList = new List({
        ...list,
        boardId: this.$route.params.id,
      });
      newList.save();
    },
    createCard(card) {
      const { Card } = this.$FeathersVuex.api;
      const newCard = new Card(card);
      newCard.save();
    },
    startDraggingCard(card) {
      this.draggingCard = card;
    },
    setDroppingList(event, list) {
      this.droppingList = list;
      event.preventDefault();
    },
    dropCard() {
      if (this.droppingList) {
        this.draggingCard.listId = this.droppingList._id; // eslint-disable-line
        this.draggingCard.save();
      }
      this.droppingList = null;
      this.draggingCard = null;
    },
  },
  mounted() {
    this.getBoard(this.$route.params.id)
      .then((res) => {
        this.board = res.data || res;
      });
    this.findLists({
      query: { boardId: this.$route.params.id },
    });
    this.findCards({
      query: { boardId: this.$route.params.id },
    });
  },
};
</script>

<style scoped>

</style>
