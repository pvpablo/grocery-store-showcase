<template>
  <v-card 
    v-if="thumbnailURL"
    max-width="260"
    class="mx-auto mb-10"
  >
    <v-img :src="thumbnailURL" height="140"></v-img>
    <v-card-title class="custom_card_title">{{ item.name }}</v-card-title>
    <v-card-subtitle>{{ item.category }}</v-card-subtitle>
    <v-card-text class="mb-2">
      <div>{{ item.package }}</div>
      <div class="text--primary">{{ item.price | formatAsCurrency }}</div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="mt-2">
        <v-spacer></v-spacer>
        <ProductDetail
          @update:item="$emit('update:cart', $event)"
          :item="item" 
          :thumbnailURL="thumbnailURL"></ProductDetail>
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
  filters: {
    formatAsCurrency: function (value) {
      if (!value) return ''
      value = value.toFixed(2)
      return `$${value}`
    }
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
