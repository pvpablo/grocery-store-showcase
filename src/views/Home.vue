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
        <CategoryCard v-for="category in categories" :key="category.id" :item="category"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { firestore } from '@/main'
  import CategoryCard from '@/components/categories/CategoryCard.vue'

  export default {
    name: 'HelloWorld',
    components: {
      CategoryCard
    },
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
