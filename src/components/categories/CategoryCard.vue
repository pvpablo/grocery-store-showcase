<template>
  <v-card
    max-width="344"
    class="mx-auto mb-10"
  >
    <v-img :src="item.img" height="194"></v-img>
    <v-card-title class="custom_card_title">{{ item.name }}</v-card-title>
    <v-card-actions>
      <v-btn text color="accent">Explore</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CategoryCard",
  props: {
    item: Object,
  },
};
</script>

<style lang="sass">

.v-card__subtitle, .v-card__text, .v-card__title
  padding: 8px 0px 0px 16px !important

.v-card__actions
  padding: 0px 0px 5px 8px !important
</style>
