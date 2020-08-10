<template>
  <div class="mx-auto">
    <v-row>
      <v-col cols="4" sm="2">
        <v-img :src="thumbnailURL" height="80" class="ml-4 rounded"></v-img>
      </v-col>
      <v-col cols="8" sm="7">
        <v-card-title class="custom_card_title">{{ item.name }}</v-card-title>
        <v-card-text class="mb-2">
          <div class="text--primary">Quantity <span>{{item.quantity}} </span>
          </div>
        </v-card-text>
      </v-col>
      <v-col v-if="item.status === 'Picked' || item.status === 'Not Found'" cols="12" sm="3" lg="2">
        <v-card-actions class="mt-5">
            <v-btn color="secondary" block @click="setItemStatus('Pending')">Remove</v-btn>
        </v-card-actions>
      </v-col>
      <v-col v-else cols="12" sm="3" lg="2">
        <v-card-actions>
            <v-btn color="secondary" class="mb-2" block @click="setItemStatus('Picked')">Mark Picked</v-btn>
        </v-card-actions>
        <v-card-actions>
            <v-btn color="primary" class="secondary--text" block @click="setItemStatus('Not Found')">Not Found</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
    <v-divider />
  </div>
</template>

<script>
  import { firestore } from "@/main"
  import { getDownloadURL } from '@/utils/firebaseStorage.js'
  export default {
    name: "CartItem",
    props: {
      item: Object,
      orderId: String
    },
    components: {
    },
    created: function () {
      getDownloadURL(this.item.thumbnailRef).then((result) => {
        this.thumbnailURL = result
      })
    },
    methods:{
      setItemStatus (status) {
        const target = {
          cart: {}
        }
        target.cart[this.item.id] = {
          'status' : status
        }
        firestore.collection('orders').doc(this.orderId).set(target, { merge: true })
      }
    },
    data () {
      return {
        thumbnailURL: null
      }
    },
  };
</script>

<style lang="sass">
  .v-card__subtitle, .v-card__text, .v-card__title
    padding: 8px 0px 0px 16px !important
</style>