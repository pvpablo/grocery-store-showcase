<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="8">
          <ProductList
            v-for="category in categories"
            :key="category.id"
            :item="category"
          />
      </v-col>

      <v-col cols="12" sm="4">
        <CheckoutDetail></CheckoutDetail>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  import { firestore } from "@/main";
  import ProductList from "@/components/checkout/ProductList.vue";
  import CheckoutDetail from "@/components/checkout/CheckoutDetail";

  export default {
    name: "HelloWorld",
    components: {
      CheckoutDetail,
      ProductList
    },
    data: () => ({
      categories: [],
      selection: 1,
    }),
    firestore() {
      return {
        categories: firestore.collection("categories"),
      };
    },
  };
</script>
