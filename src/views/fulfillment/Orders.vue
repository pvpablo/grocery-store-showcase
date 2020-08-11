<template>
  <v-container class="mt-9 mb-16">
    <v-row>
      <v-col cols="12" sm="4">
        <span class="ml-3 text-h6">Sessions</span>
        <v-card>
            <bar-chart :chart-data="datacollection"></bar-chart>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <span class="ml-3 text-h6">Carts</span>
        <v-card>
          <line-chart :chart-data="cartcollection"></line-chart>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <span class="ml-3 text-h6">Revenue</span>
        <v-card>
          <bar-chart :chart-data="revenuecollection"></bar-chart>
        </v-card>
      </v-col>
    </v-row>

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
import BarChart from "@/components/graphs/BarChart";
import LineChart from "@/components/graphs/LineChart";
import moment from "moment";

export default {
  name: "InternalOrders",
  components: {
    AssignOrder,
    BarChart,
    LineChart
  },
  data: () => {
    return {
      dialog: false,
      selectedOrder: {},
      datacollection: {},
      revenuecollection: {},
      cartcollection: {},
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
  mounted () {
    setTimeout(() =>{
      this.fillData().bind(null,this);
    },1500);

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
    },
    fillData () {
      const labels = this.stats.map(element => moment(element.date.seconds*1000).format("DD/MM"));
      const sessionDataset =[{
        label: "User Sessions",
        backgroundColor: '#4caf50',
        data: this.stats.map(element => element.sessions)
        }];

      const cartDataset =[{
          label: "Completed orders",
          borderColor: '#f44336',
          fill: false,
          data: this.stats.map(element => element.completed_orders)
        },
        {
          label: "Total orders",
          borderColor: '#555555',
          fill: false,
          data: this.stats.map(element => element.total_orders)
        }];

      const revenueDataset =[{
        label: "Revenue (Thousands $)",
        backgroundColor: '#1565C0',
        data: this.stats.map(element => element.amount/1000)
      }];

      this.datacollection = {
        labels: labels,
        datasets:sessionDataset
      }

      this.revenuecollection = {
        labels: labels,
        datasets:revenueDataset
      }

      this.cartcollection = {
        labels: labels,
        datasets:cartDataset
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  },
  firestore() {
    return {
      orders: firestore.collection("orders").orderBy('date').orderBy('time'),
      stats: firestore.collection("stats").orderBy('date'),
    }
  },
};
</script>

<style lang="sass"></style>
