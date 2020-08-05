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
    <!-- <v-row> -->
    <v-col class="d-flex flex-wrap">
      <ProductCard
        class=""
        v-for="category in categories"
        :key="category.id"
        :item="category"
      />
    </v-col>
    <!-- </v-row> -->
  </div>
</template>

<script>
import { firestore } from "@/main";
import ProductCard from "@/components/products/ProductCard.vue";

export default {
  name: "ProductGrid",
  components: {
    ProductCard,
  },
  data: () => ({
    categories: [],
    selection: 1,
  }),
  firestore() {
    return {
      categories: firestore.collection("products"),
    };
  },
};
</script>
