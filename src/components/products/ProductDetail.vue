<template>
  <v-dialog v-model="dialog" width="350">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mr-3 mb-1" color="accent" dark v-bind="attrs" v-on="on">
        Add
      </v-btn>
    </template>

    <v-card class="mx-auto pa-5">
      <v-card class="mx-auto" max-width="280">
        <v-img :src="item.img" height="140"></v-img>
      </v-card>
      <v-card-title class="custom_card_title">{{ item.name }}</v-card-title>
      <v-card-text class="mb-2">
        <p class="text--primary">Description...</p>
      </v-card-text>
      <v-card-text class="mb-2">
        <div class="text--primary d-flex pr-3">
            <span>Price:</span>
            <v-spacer></v-spacer>
            <span>MXN $54.00</span>
        </div>
        <div class="text--primary d-flex pr-3">
            <span>Package:</span>
            <v-spacer></v-spacer>
            <span>2 Piece</span>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="mt-2 d-flex">
        <QuantitySelector></QuantitySelector>
        <v-spacer></v-spacer>
        <v-btn class="mr-2" color="accent" dark>
        Add to Cart
      </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import QuantitySelector from '@/components/QuantitySelector.vue'
export default {
  name: "ProductDetail",
  components: {
      QuantitySelector
  },
  props: {
    item: Object,
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style lang="sass">

</style>
