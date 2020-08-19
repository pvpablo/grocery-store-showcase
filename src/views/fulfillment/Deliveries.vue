<template>
  <v-container class="mt-9 mb-16">
    <v-row>
      <v-col cols="12">
        <span class="text-h6">All active deliveries</span>
      </v-col>
      <v-col>
        <v-data-table
            :headers="headers"
            :items="deliveries"
            :items-per-page="5"
            class="elevation-1"
        >
          <template v-slot:[`item.stateDelivery`]="{ item }">
            <v-chip :color="getColor(item.stateDelivery)" dark>{{ item.stateDelivery }}</v-chip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { firestore } from "@/main"

export default {
  name: "Deliveries",
  data: () => {
    return {
      headers: [
        {
          text: "Order Number",
          align: "start",
          sortable: true,
          value: "id",
        },
        {
          text: "Dropoff",
          value: "dropoff.address.full_address"
        },
        {
          text: "Pickup",
          value: "pickup.address.full_address"
        },
        {
          text: "Delivery Status",
          value: "stateDelivery"
        }
      ],
      deliveries: [],
    };
  },
  methods: {
    getColor (status) {
      if (status === 'SUCCESSFUL') return 'green'
      else if (status === 'EN_ROUTE_TO_PICKUP' || status === 'AT_PICKUP' || status === 'PICKUP_ENDED' || status === 'EN_ROUTE_TO_DROPOFF' || status === 'AT_DROPOFF') return 'amber'
      else return 'gray'
    }
  },
  firestore() {
    return {
      deliveries: firestore.collection("deliveries").orderBy('createdAt', 'desc'),
    }
  },
};
</script>