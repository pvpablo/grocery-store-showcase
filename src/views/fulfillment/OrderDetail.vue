<template>
  <v-container class="mt-9 mb-16">
    <v-row>
      <v-col cols="12">
      <span class="ml-3 text-h6">Order Detail</span>
      </v-col>
      {{order}}
    </v-row>
  </v-container>
</template>

<script>
import { firestore } from "@/main";
export default {
  name: "InternalOrderDetail",
  components: {},
  data: () => {
    return {
    }
  },
  firestore() {
    return {
      order: firestore.collection("orders").doc(this.$route.params.orderId)
    }
  },
}
</script>

<style lang="sass"></style>
