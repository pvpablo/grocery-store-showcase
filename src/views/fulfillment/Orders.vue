<template>
  <v-container class="mt-9 mb-16">
    <v-row>
      <v-col cols="12">
      <span class="ml-3 text-h6">All active orders</span>
      </v-col>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="orders"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:[`item.status`]="{ item }">
            <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="primary" class="secondary--text" small dark @click="goToOrder(item)">
              <v-icon class="mr-2"
                small>
                mdi-eye
              </v-icon>
              Detail
            </v-btn>
          </template>                   
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { firestore } from "@/main";
export default {
  name: "InternalOrders",
  components: {},
  data: () => {
    return {
      headers: [
        {
          text: "Order Number",
          align: "start",
          sortable: true,
          value: "orderNumber",
        },
        { 
          text: "Store", 
          value: "store.name" 
        },
        { 
          text: "Order Date", 
          value: "date" 
        },
        { 
          text: "Pick up Window", 
          value: "time" 
        },
        { 
          text: "Status", 
          value: "status" 
        },
        { 
          text: 'Actions', 
          value: 'actions', 
          sortable: false 
        }
      ],
      orders: [],
    };
  },
  methods: {
    getColor (status) {
      if (status === 'Scheduled') return 'gray'
      else if (status === 'In Progress') return 'amber'
      else return 'green'
    },
    goToOrder (order) {
      this.$router.push({ name: "internal_order_detail", params: { orderId: order.id } })
    }
  },
  firestore() {
    return {
      orders: firestore.collection("orders").where('status', 'in', ['Scheduled', 'In Progress', 'Recently Completed']).orderBy('time'),
    }
  },
};
</script>

<style lang="sass"></style>
