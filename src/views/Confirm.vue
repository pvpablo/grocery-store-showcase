<template>
  <v-container class="mt-9 mb-16">
    <v-row>
      <v-col>
        <v-card>
          <v-container class="text-center text--lighten-5 mytext mb-16">
            <h2 class="ma-10 text-h3 success--text">Your oder has been successfully received!</h2>
            <p>One of our associates will be in touch soon. Your order ID is {{ order.orderNumber }}</p>
            <p>You can pick up at the store on <span>{{ order.date }}</span> at <span>{{ order.time }}</span></p>
            <p>Please bring a valid ID or membership card to pickup your items.</p>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="12" sm="4">
        <v-card>
          <v-container>
            <v-card-actions class="pr-1">
              <v-btn color="secondary" @click="goHome()" block>
                Continue Shopping
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import router from "@/router";
import firebase from "firebase"
import { firestore } from "@/main";

export default {
  name: 'Confirm',
  methods:{
    goHome: function(){
      router.push("/")
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
  },
  data: () => {
    return {
      name: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
      order: {}
    }
  },
  firestore() {
    return {
      order: firestore.collection("orders").doc(this.$route.params.orderId)
    }
  },
}
</script>

<style lang="sass">

.v-card__subtitle, .v-card__text, .v-card__title
  padding: 8px 0px 0px 16px !important

.v-card__actions
  padding: 0px 0px 5px 8px !important

.mytext p
  font-size: 23px
.mytext span
  font-weight: bold

</style>
