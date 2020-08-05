<template>
  <v-card
    v-if="thumbnailURL"
    max-width="280"
    class="mx-auto mb-10"
  >
    <v-img :src="thumbnailURL" height="194"></v-img>
    <v-card-title class="custom_card_title">{{ item.name }}</v-card-title>
    <v-card-actions>
      <v-btn text color="secondary" @click="$router.push('products')">Explore</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getDownloadURL } from '@/utils/firebaseStorage.js'

export default {
  name: "CategoryCard",
  props: {
    item: Object,
  },
  data () {
    return {
        thumbnailURL: null
    }
  },
  created: function () {
       getDownloadURL(this.item.thumbnailRef).then((result) => {
           this.thumbnailURL = result
       })
  },
};
</script>

<style lang="sass">

.v-card__subtitle, .v-card__text, .v-card__title
  padding: 8px 0px 0px 16px !important

.v-card__actions
  padding: 0px 0px 5px 8px !important
</style>
