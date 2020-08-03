<template>
  <v-card
    class="mx-auto mb-10"
  >
    <v-row>
      <v-col cols="12" sm="3">
        <v-img :src="thumbnailURL" height="140" class="ml-4 rounded"></v-img>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card-title class="custom_card_title">{{ item.name }}</v-card-title>
        <v-card-text class="mb-2">
          <div class="text--primary">Quantity</div>
          <div>
            1 Piece
          </div>
        </v-card-text>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" sm="2">
        <v-card-text>
          <div class="text--primary">MXN $54.00</div>
          <v-card-actions>
            <v-btn text color="secondary">Remove</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  import { getDownloadURL } from '@/utils/firebaseStorage.js'

  export default {
    name: "ProductList",
    props: {
      item: Object,
    },
    components: {

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
