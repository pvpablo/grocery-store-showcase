<template>
  <div>
    <v-col class="pt-0 pb-0 mb-3">
      <v-text-field
        solo
        hide-details
        label="Search"
        append-icon="mdi-magnify"
        class="pb-0"
      ></v-text-field>
    </v-col>
    <v-col class="d-flex flex-wrap">
      <ProductCard
        @update:cart="updateCart($event)"
        class=""
        v-for="category in categories"
        :key="category.id"
        :item="category"
      />
    </v-col>
  </div>
</template>

<script>
import firebase from "firebase"
import { firestore } from "@/main"
import ProductCard from "@/components/products/ProductCard.vue"

export default {
  name: "ProductGrid",
  components: {
    ProductCard,
  },
  data: () => ({
    categories: [],
    selection: 1,
    uid: firebase.auth().currentUser.uid,
  }),
  methods: {
    async updateCart (item) {
      const cartRef = firestore.collection('cart').doc(this.uid)
      const wrappedItem = { products: {}}
      wrappedItem['products'][item.id] = item
      await cartRef.set(wrappedItem, { merge: true })
    }
  },
  firestore() {
    return {
      categories: firestore.collection("products"),
    };
  },
};
</script>