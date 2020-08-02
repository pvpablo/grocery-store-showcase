<template>
  <v-container>
    <v-toolbar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row no-gutters>
      <v-col cols="12" sm="3" class="mt-3">
        <v-card class="mx-auto" max-width="374">
          <v-card-title>Cafe Badilico</v-card-title>
          <v-card-text>
            <div>
              Small plates, salads & sandwiches - an intimate setting with 12
              indoor seats plus patio seating.
            </div>
          </v-card-text>
        </v-card>
      </v-col>
        <v-col class="d-flex flex-wrap mt-3">
          <ProductCard
            v-for="category in categories"
            :key="category.id"
            :item="category"
          />
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { firestore } from "@/main";
import ProductCard from "@/components/products/ProductCard.vue";
 
export default {
  name: "HelloWorld",
  components: {
    ProductCard,
  },
  data: () => ({
    categories: [],
    selection: 1,
  }),
  firestore() {
    return {
      categories: firestore.collection("categories")
    }
  },
};
</script>
