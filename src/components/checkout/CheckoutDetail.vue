<template>
  <v-card
    class="mx-auto mb-10 ml-8 pa-5"
  >
      <h3>Details</h3>
    <v-list>
      <v-list-item>
        <v-list-item-content class="label">Subtotal</v-list-item-content>
        <v-list-item-content class="value">${{ subtotal }} </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="label">Estimated Tax</v-list-item-content>
        <v-list-item-content class="value">${{ getTaxes() }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="label">Total</v-list-item-content>
        <v-list-item-content class="value">${{ getTotal() }}</v-list-item-content>
      </v-list-item>
    </v-list>
      <v-divider></v-divider>
      <v-btn block class="mr-2 mt-5" @click="placeOrder" color="secondary" dark>
        Place order
      </v-btn>
  </v-card>
</template>

<script>
  import router from "@/router";

  export default {
    name: "CheckoutDetail",
    props: {
      subtotal: Number,
    },
    components: {

    },
    data () {
      return {
        taxes : 0,
        total: 0,
      }
    },
    methods:{
      getTaxes(){
        this.taxes = this.subtotal * 0.16;
        return this.taxes.toFixed(2);
      },
      getTotal(){
        return (this.subtotal + this.taxes).toFixed(2);
      },
      placeOrder: function (){
        router.push("confirm")
      }
    }
  };
</script>

<style lang="sass">
  .v-card__subtitle, .v-card__text, .v-card__title
    padding: 8px 0px 0px 16px !important
</style>
