<template>
  <div class="d-flex">
    <v-btn small @click="decreaseQuantity">
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <span class="pl-1 pr-1 pt-1">{{ quantity }}</span>
    <v-btn small @click="increaseQuantity">
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
    increaseQuantity() {
      this.quantity = this.quantity + 1
    },
    decreaseQuantity() {
      if(this.quantity > 0){
        this.quantity = this.quantity - 1
      }
    }
  }
}


</script>