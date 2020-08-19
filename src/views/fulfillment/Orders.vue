<template>
  <v-container class="mt-9 mb-16">
    <v-row>
      <v-col cols="12">
        <span class="text-h6">All active orders</span>
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

    <v-row :align="alignment" :justify="justify">
      <v-col cols="12"  sm="6" >
        <span class="text-h6">Sessions</span>
        <v-card>
          <bar-chart  :chart-data="datacollection" :options="chartOptions" height="150"></bar-chart>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" >
        <span class="text-h6">Orders</span>
        <v-card >
          <bar-chart :chart-data="orderscollection" :options="chartOptions" height="150"></bar-chart>
        </v-card>
      </v-col>


    </v-row >
    <v-row :align="alignment" :justify="justify">
      <v-col cols="12" sm="6" >
        <span class="text-h6">Revenue</span>
        <v-card >
          <line-chart :chart-data="revenuecollection" :options="chartOptions" height="150"></line-chart>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <span class="text-h6">Cart Abandonment</span>
        <v-card>
          <line-chart :chart-data="cartcollection" :options="chartOptions" height="150"></line-chart>
        </v-card>
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
// import PieChart from "@/components/graphs/PieChart";
import moment from "moment";

export default {
  name: "InternalOrders",
  components: {
    AssignOrder,
    BarChart,
    LineChart,
    // PieChart
  },
  data: () => {
    return {
      dialog: false,
      selectedOrder: {},
      datacollection: {},
      revenuecollection: {},
      cartcollection: {},
      orderscollection: {},
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
      alignment:"center",
      justify:"center",
      myStyles: {
        height: '300px',
        width: '100%',
        position: 'relative',
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
              gridLines: {
                  display: false
              }
          }],
          yAxes: [{
              gridLines: {
                  display: false
              },
              ticks: {
                maxTicksLimit: 5,
                beginAtZero: true,
              }
          }]
      }
      }
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
        label: "Total orders",
        borderColor: '#f44336',
        fill: false,
        data: this.stats.map(element => element.completed_orders)
      },
      {
        label: "Active Shopping Carts",
        borderColor: '#555555',
        fill: false,
        data: this.stats.map(element => element.total_orders)
      }];

      const revenueDataset =[{
        label: "Revenue (Thousands $)",
        borderColor: '#1565C0',
        fill: false,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutoutPercentage: 80,
          legend: {
            display: false
          },
          tooltips: {
            enabled: false
          },
          hover: {
            mode: false
          }
        },
        data: this.stats.map(element => (element.amount/1000).toFixed(2))
      }];

      const ordersDataset =[
        {
          label: "Shopping Orders",
          data: [
            this.totals["scheduled"],
            this.totals["canceled"],
            this.totals["in-progress"],
            this.totals["completed"],
          ],
          backgroundColor:[
            "#545454",
            "#db3214",
            "#ffc106",
            "#4baf4f",
          ]
        }
      ];
      console.log(this.totals.canceled)

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

      this.orderscollection = {
        labels: ["Scheduled","Canceled","In Progress","Completed"],
        datasets:ordersDataset
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
      totals: firestore.collection("totals").doc("august"),
    }
  },
};
</script>

<style lang="sass"></style>
