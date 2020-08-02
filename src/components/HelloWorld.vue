<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex flex-wrap">
        <v-card v-for="category in categories" :key="category.id" max-width="344" class="mx-auto mb-10">
          <v-img :src="category.img" height="194"></v-img>
          <v-card-title class="custom_card_title">{{ category.name }}</v-card-title>
          <v-card-actions>
            <v-btn text color="accent">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { firestore } from '@/main'

  export default {
    name: 'HelloWorld',

    data: () => ({
      categories: []
    }),
    firestore () {
      return {
        categories: firestore.collection('categories')
      }
    },
  }
</script>

<style lang="sass">

.v-card__subtitle, .v-card__text, .v-card__title
  padding: 8px 0px 0px 16px !important

.v-card__actions
  padding: 0px 0px 5px 8px !important
</style>
