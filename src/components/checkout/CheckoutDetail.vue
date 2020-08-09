<template>
  <v-card
    class="mx-auto mb-10 ml-8 pa-5"
  >
      <h3>Details</h3>
    <v-list>
      <v-list-item>
        <v-list-item-content class="label">Subtotal</v-list-item-content>
        <v-list-item-content class="value">${{ subtotal }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="label">Tax</v-list-item-content>
        <v-list-item-content class="value">${{ getTax() }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="label">Total</v-list-item-content>
        <v-list-item-content class="value">${{ getTotal() }}</v-list-item-content>
      </v-list-item>
    </v-list>
      <v-divider></v-divider>
      <div v-if="error_label" class="error_msg mt-4">{{error_label}}</div>
      <v-btn block class="mr-2 mt-5" @click="placeOrder" color="secondary" dark>
        Place order
      </v-btn>
  </v-card>
</template>

<script>
  import router from "@/router";
  import { firestore } from "@/main";

  export default {
    name: "CheckoutDetail",
    props: {
      subtotal: Number,
      order: Object
    },
    components: {

    },
    data () {
      return {
        tax : 0,
        total: 0,
        error_label: undefined
      }
    },
    methods:{
      getTax(){
        this.tax = this.subtotal * 0.16;
        return this.tax.toFixed(2);
      },
      getTotal(){
        // return (this.subtotal + this.taxes).toFixed(2);
        const total = this.subtotal + this.tax
        return parseFloat(total).toFixed(2);
      },
      generateDate(){
        function getRandomDate(from, to) {
          from = from.getTime();
          to = to.getTime();
          return new Date(from + Math.random() * (to - from));
        }
        const today = new Date() ;
        const next5Days = new Date();
        next5Days.setDate(next5Days.getDate() + 5 );
        const randomDate = getRandomDate(today,next5Days);
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' })
        const [{ value: month },,{ value: day },,] = dateTimeFormat.formatToParts(randomDate)
        return `${month}, ${day}`;
      },
      placeOrder: function (){
        console.log(this.order.store);
        if(!this.order.store){
          this.error_label = "Please select an store before continue";
          return false;
        }

        if(!this.order.time){
          this.error_label = "Please select an time for pick up before continue";
          return false;
        }

        if(!this.order.card){
          this.error_label = "Please a payment method before continue";
          return false;
        }

        const orderNumber = Math.floor(Math.random() * 9999999) + 10000;
        this.order.orderNumber = orderNumber;
        this.order.created = new Date();
        this.order.date = this.generateDate();

        firestore
            .collection("order")
            .doc(`${orderNumber}`)
            .set(this.order)
            .then(()=>{
              firestore
                .collection("cart")
                .doc(this.order.uid)
                .delete()
                .then(function(){
                  router.push("confirm");
                })
            });
      }
    }
  };
</script>

<style lang="sass">
  .v-card__subtitle, .v-card__text, .v-card__title
    padding: 8px 0px 0px 16px !important
  .error_msg
    color: red
</style>
