<template>
  <v-card class="mx-auto mb-10 ml-8 pa-5">
    <v-list v-if="order.cart">
      <v-list-item>
        <v-list-item-content class="label">Subtotal</v-list-item-content>
        <v-list-item-content class="value"
          >${{ subtotal }}</v-list-item-content
        >
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="label">Tax</v-list-item-content>
        <v-list-item-content class="value">${{ getTax() }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content class="label">Total</v-list-item-content>
        <v-list-item-content class="value"
          >${{ getTotal() }}</v-list-item-content
        >
      </v-list-item>
    </v-list>
    <v-list v-else>
      <v-list-item>
        <v-list-item-content class="label">No items in cart</v-list-item-content>
      </v-list-item>
    </v-list>
    <div v-if="order.cart">
      <v-divider></v-divider>
      <div v-if="error_label" class="error_msg mt-4">{{ error_label }}</div>
        <v-btn block class="mr-2 mt-5" @click="placeOrder" color="secondary" dark>
          Place order
        </v-btn>
    </div>
  </v-card>
</template>

<script>
import router from "@/router";
import { firestore } from "@/main";

export default {
  name: "CheckoutDetail",
  props: {
    order: Object,
  },
  components: {},
  data() {
    return {
      tax: 0,
      total: 0,
      error_label: undefined,
      orderId: undefined,
    };
  },
  computed: {
    subtotal: function (){
      let subtotal = 0
      for (const [key] of Object.entries((this.order.cart))) {
        subtotal += this.order.cart[key].price * this.order.cart[key].quantity;
      }
      return subtotal.toFixed(2)
    }
  },
  methods: {
    goHome: function() {
      router.push("/");
    },
    getTax() {
      this.tax = this.subtotal * 0.16
      return this.tax.toFixed(2)
    },
    getTotal() {
      const total = this.subtotal + this.tax
      return parseFloat(total).toFixed(2)
    },
    generateDate() {
      function getRandomDate(from, to) {
        from = from.getTime();
        to = to.getTime();
        return new Date(from + Math.random() * (to - from));
      }
      const today = new Date();
      const next5Days = new Date();
      next5Days.setDate(next5Days.getDate() + 5);
      const randomDate = getRandomDate(today, next5Days);
      const dateTimeFormat = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
      const [
        { value: month },
        ,
        { value: day },
        ,
      ] = dateTimeFormat.formatToParts(randomDate)
      return `${month}, ${day}`;
    },
    placeOrder: function() {
      if (!this.order.store) {
        this.error_label = "Please select a store"
        return false
      }

      if (!this.order.time) {
        this.error_label = "Please select a pick up timeslot"
        return false
      }

      if (!this.order.card) {
        this.error_label = "Please select a payment method"
        return false
      }

      if (!this.order.cart) {
        this.error_label = "Please select one or more products"
        return false
      }

      const orderNumber = Math.floor(Math.random() * 9999999) + 10000
      this.order.orderNumber = orderNumber
      this.order.created = new Date()
      this.order.date = this.generateDate()

      firestore
        .collection("orders")
        .add(this.order)
        .then((docRef) => {
          this.orderId = docRef.id
          firestore
            .collection("cart")
            .doc(this.order.user.uid)
            .delete()
            .then(() => {
              router.push({ name: "confirm", params: { orderId: this.orderId } })
            })
        })
    },
  },
};
</script>

<style lang="sass">
.v-card__subtitle, .v-card__text, .v-card__title
  padding: 8px 0px 0px 16px !important
.error_msg
  color: red
</style>
