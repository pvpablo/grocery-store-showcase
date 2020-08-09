<template>
  <div class="d-flex">
    <v-btn small @click="updateQuantity('decrease')">
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <span class="pl-2 pr-2 pt-1">{{ quantity }}</span>
    <v-btn small @click="updateQuantity('increase')">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "ProductDetail",
  data() {
    return {
      quantity: 0,
    };
  },
  methods: {
    updateQuantity (action) {
      if (action == 'increase') {
        this.quantity = this.quantity + 1
      } else if (action == 'decrease' && this.quantity > 0) {
        this.quantity = this.quantity - 1
      }
      this.$emit('update:quantity', this.quantity)
    }
  }
}
</script>