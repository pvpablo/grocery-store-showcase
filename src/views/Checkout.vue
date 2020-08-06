<template>
  <v-container>
    <v-row class="pr-3" height="200px">
      <v-col cols="12" sm="8" class="mt-3">
        <span class="ml-3 text-h6">Your Cart</span>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" sm="8">
        <StoreSelect v-bind:stores="stores"></StoreSelect>

        <v-row class="pr-3" height="200px">
          <v-col cols="12" sm="8" class="mt-3">
            <span class="ml-3 text-h6">Payment</span>
          </v-col>
        </v-row>

        <Payment></Payment>

        <v-row class="pr-3" height="200px">
          <v-col cols="12" sm="8" class="mt-3">
            <span class="ml-3 text-h6">Products</span>
          </v-col>
        </v-row>

        <ProductList
          v-for="category in cart.products"
          :key="category.id"
          :item="category"
        />
      </v-col>

      <v-col cols="12" sm="4">
        <CheckoutDetail :subtotal="subtotal"></CheckoutDetail>
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
  import router from "@/router";
  export default {
    name: "HelloWorld",
    components: {
      CheckoutDetail,
      ProductList,
      StoreSelect,
      Payment
    },
    data: () => ({
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
            //IF THE CART IS EMPTY, GO TO STORE
            if(!Object.keys(this.products).length){
              router.push("/");
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
