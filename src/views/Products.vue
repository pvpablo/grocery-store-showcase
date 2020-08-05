<template>
  <v-container>
    <v-row class="pr-3">
      <v-col cols="12" sm="5" class="mt-3">
        <v-btn color="" icon>
            <v-icon>mdi-menu</v-icon>
        </v-btn>
      <span class="ml-3 text-h6">Product Listing</span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="3" class="d-flex flex-wrap ml-3">
        <v-select
          solo
          hide-details
          item-color="secondary"
          :items="priceRanges"
          label="Sort By"
        ></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" sm="3" class="mt-3">
        <v-card class="mx-auto" max-width="374">
          <v-card-text>
            <span class="text-subtitle-1">Price</span>
            <v-checkbox v-for="item in priceFilterOptions" :key="item" 
            hide-details
            class="mt-0"
            v-model="filters.priceFilter" 
            :label="item" 
            :value="item" 
            light
            color="secondary"></v-checkbox>
          </v-card-text>
          <v-divider class="mt-2 mb-2"></v-divider>
          <v-card-text>
            <span class="text-subtitle-1">Category</span>
            <v-radio-group v-model="filters.category" column>
              <v-radio v-for="category in categories" 
              :key="category.id" 
              :label="category.name" 
              :value="category.name"
              color="secondary"
              light></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-divider class="mt-2 mb-2"></v-divider>
          <v-card-actions class="pr-1">
            <v-btn color="secondary" block>
              Clear Filters
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
        <v-col class="d-flex flex-wrap mt-3">
          <ProductGrid />
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductGrid from "@/components/products/ProductGrid.vue"
import { firestore } from "@/main";
 
export default {
  name: "ProductsView",
  components: {
    ProductGrid
  },
  data: () => ({
    priceRanges: ['Lowest Price', 'Highest Price'],
    priceFilterOptions: ['Less than $25', '$25 - $50', 'More than $50'],
    filters: {
      priceFilter: [],
      category: ''
    },
    selection: 1,
  }),
  firestore() {
    return {
      categories: firestore.collection("categories"),
    };
  }
};
</script>
