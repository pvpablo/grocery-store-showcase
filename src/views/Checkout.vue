<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="8">
        <v-col cols="12" sm="8" class="mt-3">
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
        <div v-if="Object.keys(cart.products).length > 0">
          <ProductList
            v-for="product in cart.products"
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
        <CheckoutDetail :order="order" :subtotal="parseFloat(subtotal)"></CheckoutDetail>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  import firebase from "firebase"
  import { firestore } from "@/main";
  import ProductList from "@/components/checkout/ProductList.vue";
  import CheckoutDetail from "@/components/checkout/CheckoutDetail.vue";
  import StoreSelect from "@/components/checkout/StoreSelect.vue";
  import Payment from "@/components/checkout/Payment.vue";
  // import router from "@/router";
  export default {
    name: "HelloWorld",
    components: {
      CheckoutDetail,
      ProductList,
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
        }
      },
      categories: [],
      selection: 1,
      products: {},
      subtotal: 0,
      uid: firebase.auth().currentUser.uid
    }),
    created : function() {
      firestore
          .collection("cart")
          .doc(this.uid)
          .onSnapshot( (querySnapshot) => {
            this.subtotal = 0;
            this.products = querySnapshot.data().products;
            if(!Object.keys(this.products).length){
              this.order.cart = undefined
            } else {
              this.order.cart = this.products;
            }
            Object.keys(this.products).map(key => {
              this.subtotal += this.products[key].price * this.products[key].quantity;
            });
            this.subtotal = +this.subtotal.toFixed(2);
          })
    },
    firestore() {
      return {
        cart: firestore.collection("cart").doc(this.uid),
        stores: firestore.collection("stores").orderBy('name'),
      };
    },
  };
</script>
