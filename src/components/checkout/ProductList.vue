<template>
  <v-card
    class="mx-auto mb-10 d-flex"
  >
    <v-row>
      <v-col cols="12" sm="3">
        <v-img :src="thumbnailURL" height="140" class="ml-4 rounded"></v-img>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card-title class="custom_card_title">{{ item.name }}</v-card-title>
        <v-card-text class="mb-2">
          <div class="text--primary">Quantity</div>
          <div>
            {{item.quantity}}
          </div>
        </v-card-text>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" sm="2">
        <v-card-text>
          <div class="text--secondary">Price per unit</div>
          <div class="text--primary">${{item.price.toFixed(2)}}</div>

          <div class="text--secondary">Subtotal</div>
          <div class="text--primary">${{ (item.price* item.quantity).toFixed(2) }}</div>
          <v-card-actions class="pa-0">
            <v-btn  @click="deleteItem(item.id)" text color="secondary" class="pa-0">Remove</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  import { firestore } from '@/main'
  import { getDownloadURL } from '@/utils/firebaseStorage.js'
  import firebase from "firebase";
  export default {
    name: "ProductList",
    props: {
      item: Object,
    },
    components: {
    },
    created: function () {
      getDownloadURL(this.item.thumbnailRef).then((result) => {
        this.thumbnailURL = result
      })
    },
    methods:{
      deleteItem: async function(productId){
        const cartRef = firestore.collection('cart').doc(this.uid)
        const cart = await cartRef.get();
        let currentProducts = cart.data().products;
        delete currentProducts[productId];
        const wrappedItem = { products: currentProducts}
        await cartRef.set(wrappedItem)
      }
    },
    data () {
      return {
        uid: firebase.auth().currentUser.uid,
        thumbnailURL: null
      }
    },
  };
</script>

<style lang="sass">
  .v-card__subtitle, .v-card__text, .v-card__title
    padding: 8px 0px 0px 16px !important
</style>