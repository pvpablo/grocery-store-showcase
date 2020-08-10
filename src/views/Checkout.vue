<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="8">
        <v-col cols="12" sm="8">
          <span class="text-h6">Pick up</span>
        </v-col>
        <StoreSelect  :order="order" v-bind:stores="stores"></StoreSelect>

        <v-row class="pr-3" height="200px">
          <v-col cols="12" sm="8" class="mt-3">
            <span class="ml-3 text-h6">Payment</span>
          </v-col>
        </v-row>
        <Payment :order="order"></Payment>
        
        <v-row class="pr-3" height="200px">
          <v-col cols="12" sm="8" class="mt-3">
            <span class="ml-3 text-h6">Shopping cart</span>
          </v-col>
        </v-row>
        <div v-if="order.cart && Object.keys(order.cart).length > 0">
          <ProductListing
            v-for="product in order.cart"
            :key="product.id"
            :item="product"
          />
        </div>
        <div v-else>
          <v-card class="mx-auto mb-10 d-flex">
            <v-row class="justify-center">
              <v-card-text>
                <p class="pa-5 text-center">No items to display</p>
              </v-card-text>
          </v-row>
        </v-card>
        </div>
      </v-col>
      <v-col cols="12" sm="4">
        <v-col class="ml-8 pl-0">
          <span class="text-h6">Order Summary</span>
        </v-col>
        <CheckoutDetail :order="order" :subtotal="parseFloat(subtotal)"></CheckoutDetail>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  import firebase from "firebase"
  import { firestore } from "@/main";
  import ProductListing from "@/components/products/ProductListing.vue";
  import CheckoutDetail from "@/components/checkout/CheckoutDetail.vue";
  import StoreSelect from "@/components/checkout/StoreSelect.vue";
  import Payment from "@/components/checkout/Payment.vue";
  // import router from "@/router";
  export default {
    name: "Checkout",
    components: {
      CheckoutDetail,
      ProductListing,
      StoreSelect,
      Payment
    },
    data: () => ({
      order:{
        card: undefined,
        store: undefined,
        time: undefined,
        cart: undefined,
        user: {
          uid: firebase.auth().currentUser.uid,
          displayName: firebase.auth().currentUser.displayName,
        },
        status: 'Scheduled',
      },
      categories: [],
      selection: 1,
      products: {},
      subtotal: 0,
      uid: firebase.auth().currentUser.uid
    }),
    created : function() {
      firestore
          .collection(  "cart")
          .doc(this.uid)
          .onSnapshot( (querySnapshot) => {
            this.subtotal = 0;
            if (querySnapshot.data()) {
              this.products = querySnapshot.data().products;
              if(!Object.keys(this.products).length){
                this.order.cart = undefined
              } else {
                this.order.cart = this.products;
              }
            }
            
          })
    },
    firestore() {
      return {
        stores: firestore.collection("stores").orderBy('name'),
      };
    },
  };
</script>
