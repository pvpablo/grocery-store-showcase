<template>
  <v-container class="mt-9 mb-16">
    <v-row>
      <v-col cols="9">
        <span class="text-h6">Order Detail - {{ order.orderNumber }} </span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col v-if="order.delivery">
        <v-chip color="secondary" text-color="white">Delivered</v-chip>
      </v-col>
      <v-col v-else>
        <v-btn color="secondary" class="primary--text" small dark @click="sendDelivery(order)">
          <v-icon class="mr-2"
            small>
            mdi-send
          </v-icon>
          Send Delivery
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-progress-linear
          color="secondary"
          :value="orderProgress"
        ></v-progress-linear>
      </v-col>
      <v-col cols="12">
        <v-card class="pb-5">
          <v-card-title class="pa-4">Pending Items</v-card-title>
          <v-divider />
          <v-card-text>
            <v-col v-if="Object.keys(pendingItems).length > 0" class="pt-0 pb-0">
              <CartItem
                v-for="pendingItem in pendingItems"
                :key="pendingItem.id"
                :item="pendingItem"
                :orderId="$route.params.orderId"
              />
            </v-col>
            <v-col v-else>
              <EmptyContainer />
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="pb-5">
          <v-card-title class="pa-4">Picked Items</v-card-title>
          <v-divider />
          <v-card-text>
            <v-col v-if="Object.keys(pickedItems).length > 0" class="pt-0 pb-0">
              <CartItem
                v-for="pickedItem in pickedItems"
                :key="pickedItem.id"
                :item="pickedItem"
                :orderId="$route.params.orderId"
              />
            </v-col>
            <v-col v-else>
              <EmptyContainer />
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="pb-5">
          <v-card-title class="pa-4">Not Found Items</v-card-title
          >
          <v-divider />
          <v-card-text>
            <v-col
              v-if="Object.keys(notFoundItems).length > 0"
              class="pt-0 pb-0"
            >
              <CartItem
                v-for="notFoundItem in notFoundItems"
                :key="notFoundItem.id"
                :item="notFoundItem"
                :orderId="$route.params.orderId"
              />
            </v-col>
            <v-col v-else>
              <EmptyContainer />
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { firestore } from "@/main";
import CartItem from "@/components/fulfillment/CartItem.vue";
import EmptyContainer from "@/components/general/EmptyContainer.vue";
export default {
  name: "InternalOrderDetail",
  components: {
    CartItem,
    EmptyContainer,
  },
  methods: {
    sendDelivery(order) {
      let delivery = {
        createdAt: new Date(),
        status: order.status,
        dropoff: {
          customer: {
            name: "Pablo Perez"
          },
          address: {
            id: 1,
            country: "MX",
            full_address: "Calle Montes Urales 445, Lomas - Virreyes, Lomas de Chapultepec, Miguel Hidalgo, 11000 Ciudad de México, CDMX, Mexico",
            lat: 19.428812,
            lng: -99.206751
          }
        },
        pickup: {
          address: {
            id: 1,
            country: "MX",
            full_address: "Av. Paseo de la Reforma 222, Juárez, Cuauhtémoc, 06600 Ciudad de México, CDMX, Mexico",
            lat: 19.429160,
            lng: -99.162092,
            notes: "Pickup in the parking lot at bay 3"
          }
        },
        stateDelivery: 'PENDING',
        cart: order.cart
      }
      firestore.collection("deliveries").doc(this.$route.params.orderId).set(delivery).then( () => {
        firestore.collection("orders").doc(this.$route.params.orderId).set({delivery: true}, { merge: true })
      })
    }
  },
  created: function() {
    firestore
      .collection("orders")
      .doc(this.$route.params.orderId)
      .onSnapshot((querySnapshot) => {
        const itemsInCart = querySnapshot.data().cart
        let tempPickedItems = {}
        let tempPendingItems = {}
        let tempNotFoundItems = {}
        let pickedItemsCount = 0
        let notFoundItemsCount = 0
        let totalItems = 0
        for (const [key, value] of Object.entries(itemsInCart)) {
          totalItems = totalItems + 1
          if (value.status === "Picked") {
            pickedItemsCount = pickedItemsCount + 1
            tempPickedItems[key] = value
          } else if (value.status === "Not Found") {
            tempNotFoundItems[key] = value
            notFoundItemsCount = notFoundItemsCount + 1
          } else {
            tempPendingItems[key] = value
          }
        }
        this.order = querySnapshot.data()
        this.pickedItems = tempPickedItems
        this.pendingItems = tempPendingItems
        this.notFoundItems = tempNotFoundItems
        this.orderProgress =
          ((notFoundItemsCount + pickedItemsCount) / totalItems) * 100
      });
  },
  data: () => {
    return {
        order: {},
        orderProgress: 0,
        orderNumber: undefined,
        pickedItems: {},
        pendingItems: {},
        notFoundItems: {},
    };
  },
};
</script>

<style lang="sass"></style>
