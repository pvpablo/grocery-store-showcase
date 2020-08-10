<template>
  <v-container class="mt-9 mb-16">
    <v-row>
      <v-col>
        <h1>Orders</h1>
        {{ orders }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { firestore } from "@/main";
export default {
  name: "InternalOrders",
  components: {

  },
  data: () => {
    return {
        orders: [],
    };
  },
  firestore() {
    return {
      orders: firestore.collection("orders").orderBy('created'),
    }
  },
}
</script>

<style lang="sass"></style>
