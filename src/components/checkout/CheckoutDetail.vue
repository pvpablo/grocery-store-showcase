<template>
  <v-card
    class="mx-auto mb-10 ml-8 pa-5"
  >
      <h3>Details</h3>
    <v-list>
      <v-list-item>
        <v-list-item-content class="label">Subtotal</v-list-item-content>
        <v-list-item-content class="value">$100,000</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="label">Estimated Tax</v-list-item-content>
        <v-list-item-content class="value">$100,000</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="label">Delivery</v-list-item-content>
        <v-list-item-content class="value">$100,000</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="label">Total</v-list-item-content>
        <v-list-item-content class="value">$100,000</v-list-item-content>
      </v-list-item>
    </v-list>
      <v-divider></v-divider>
      <v-btn block class="mr-2 mt-5 " color="accent" dark>
        Place order
      </v-btn>

  </v-card>
</template>

<script>
  export default {
    name: "CheckoutDetail",
    props: {
      cart: Object,
    },
    components: {

    },
    data () {
      return {
      }
    },
  };
</script>

<style lang="sass">
  .v-card__subtitle, .v-card__text, .v-card__title
    padding: 8px 0px 0px 16px !important
</style>
