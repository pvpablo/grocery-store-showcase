<template>
  <v-container class="mt-9 mb-16">
    <v-row>
      <v-col cols="12">
        <span class="text-h6">Order Detail - {{ order.orderNumber }} </span>
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
  created: function() {
    firestore
      .collection("orders")
      .doc(this.$route.params.orderId)
      .onSnapshot((querySnapshot) => {
        const itemsInCart = querySnapshot.data().cart;
        let tempPickedItems = {};
        let tempPendingItems = {};
        let tempNotFoundItems = {};
        let pickedItemsCount = 0;
        let notFoundItemsCount = 0;
        let totalItems = 0;
        for (const [key, value] of Object.entries(itemsInCart)) {
          totalItems = totalItems + 1;
          if (value.status === "Picked") {
            pickedItemsCount = pickedItemsCount + 1;
            tempPickedItems[key] = value;
          } else if (value.status === "Not Found") {
            tempNotFoundItems[key] = value;
            notFoundItemsCount = notFoundItemsCount + 1;
          } else {
            tempPendingItems[key] = value;
          }
        }
        this.order = querySnapshot.data()
        this.pickedItems = tempPickedItems;
        this.pendingItems = tempPendingItems;
        this.notFoundItems = tempNotFoundItems;
        this.orderProgress =
          ((notFoundItemsCount + pickedItemsCount) / totalItems) * 100;
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
