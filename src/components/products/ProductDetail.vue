<template>
  <v-dialog v-model="dialog" width="350">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mr-3 mb-1" color="secondary" dark v-bind="attrs" v-on="on">
        Add
      </v-btn>
    </template>

    <v-card class="mx-auto pa-5">
      <v-card class="mx-auto" max-width="280">
        <v-img :src="thumbnailURL" height="140"></v-img>
      </v-card>
      <v-card-title class="custom_card_title">{{ item.name }}</v-card-title>
      <v-card-text class="mb-2">
        <div class="text--primary d-flex pr-3">
            <span>Package:</span>
            <v-spacer></v-spacer>
            <span>{{ item.package }}</span>
        </div>
        <div class="text--primary d-flex pr-3">
            <span>Price:</span>
            <v-spacer></v-spacer>
            <span>{{ item.price | formatAsCurrency }}</span>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="mt-2 d-flex">
        <QuantitySelector @update:quantity="updateQuantity($event)"></QuantitySelector>
        <v-spacer></v-spacer>
        <v-btn class="mr-2" color="secondary" dark @click="updateItem">Add to Cart</v-btn>
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
  filters: {
    formatAsCurrency: function (value) {
      if (!value) return ''
      value = value.toFixed(2)
      return `$${value}`
    }
  },
  methods: {
    updateQuantity (value) {
      this.quantity = value
    },
    updateItem() {
      const updatedItem = Object.assign({quantity: this.quantity}, this.item)
      this.$emit('update:item', updatedItem)
      this.dialog = false
    }
  },
  props: {
    item: Object,
    thumbnailURL: String
  },
  data() {
    return {
      dialog: false,
      quantity: 0
    };
  },
};
</script>

<style lang="sass">

</style>
