<template>
  <v-container>
    <v-row class="pr-3">
      <v-col cols="12" sm="5" class="mt-3">
      <span class="ml-3 text-h6">Your weekly shop for less</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex flex-wrap">
        <CategoryCard v-for="deal in deals" :key="deal.id" :item="deal"/>
      </v-col>
    </v-row>
    <v-row class="pr-3">
      <v-col cols="12" sm="5">
      <span class="ml-3 text-h6">Featured Categories</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex flex-wrap">
        <CategoryCard v-for="category in categories" :key="category.id" :item="category"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { firestore } from '@/main'
  import CategoryCard from '@/components/categories/CategoryCard.vue'

  export default {
    name: 'Home',
    components: {
      CategoryCard
    },
    data: () => ({
      categories: [],
      deals: []
    }),
    firestore () {
      return {
        categories: firestore.collection('categories'),
        deals: firestore.collection('deals')
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
