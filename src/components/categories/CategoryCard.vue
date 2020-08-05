<template>
  <v-card
    v-if="thumbnailURL"
    max-width="260"
    class="mx-auto mb-10"
  >
    <v-card-title class="mb-2 mt-2">{{ item.name }}</v-card-title>
    <v-img :src="thumbnailURL" height="194"></v-img>
    <v-card-actions class="mt-2 mb-2">
      <v-btn text color="secondary" @click="$router.push('products')">See More</v-btn>
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
