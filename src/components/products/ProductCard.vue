<template>
  <v-card 
    v-if="thumbnailURL"
    max-width="180"
    class="mx-auto mb-10"
  >
    <v-img :src="thumbnailURL" height="140"></v-img>
    <v-card-title class="custom_card_title">{{ item.name }}</v-card-title>
    <v-card-text class="mb-2">
      <div class="text--primary">MXN $54.00</div>
      <div>
        <!-- 1 Piece -->
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="mt-2">
        <v-spacer></v-spacer>
        <ProductDetail :item="item"></ProductDetail>
    </v-card-actions>
  </v-card>
</template>

<script>
import ProductDetail from '@/components/products/ProductDetail.vue'
import { getDownloadURL } from '@/utils/firebaseStorage.js'

export default {
  name: "ProductCard",
  props: {
    item: Object,
  },
  components: {
      ProductDetail
  },
  created: function () {
       getDownloadURL(this.item.thumbnailRef).then((result) => {
           this.thumbnailURL = result
       })
  },
  data () {
      return {
          thumbnailURL: null
      }
    },
};
</script>

<style lang="sass">

.v-card__subtitle, .v-card__text, .v-card__title
  padding: 8px 0px 0px 16px !important
</style>
