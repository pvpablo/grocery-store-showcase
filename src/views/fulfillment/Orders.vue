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
            <v-btn color="primary" class="secondary--text mr-3" small dark @click="goToOrder(item)">
              <v-icon class="mr-2"
                small>
                mdi-eye
              </v-icon>
              Detail
            </v-btn>
            <v-btn color="secondary" class="primary--text" small dark @click="manageOrder(item)">
              <v-icon class="mr-2"
                small>
                mdi-briefcase
              </v-icon>
              Manage
            </v-btn>
          </template>                   
        </v-data-table>
      </v-col>
    </v-row>
    <AssignOrder :dialog="this.dialog" :order="this.selectedOrder" @update:dialog="closeDialog" />
  </v-container>
</template>

<script>
import { firestore } from "@/main"
import AssignOrder from '@/components/fulfillment/AssignOrder.vue'
export default {
  name: "InternalOrders",
  components: {
    AssignOrder
  },
  data: () => {
    return {
      dialog: false,
      selectedOrder: {},
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
    closeDialog () {
      this.dialog = false
      this.selectedOrder = {}
    },
    getColor (status) {
      if (status === 'Scheduled') return 'gray'
      else if (status === 'In Progress') return 'amber'
      else return 'green'
    },
    goToOrder (order) {
      this.$router.push({ name: "internal_order_detail", params: { orderId: order.id } })
    },
    manageOrder (order) {
      this.selectedOrder = order
      this.dialog = true
    }
  },
  firestore() {
    return {
      orders: firestore.collection("orders").orderBy('date').orderBy('time'),
    }
  },
};
</script>

<style lang="sass"></style>
