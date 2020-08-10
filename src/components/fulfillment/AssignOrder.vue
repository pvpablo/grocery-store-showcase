<template>
    <v-dialog
      v-model="dialog"
      width="500"
      persistent
    >
      <v-card>
        <v-card-title class="headline grey lighten-2 pa-5">
          <span class="text-h6">Order - {{ order.orderNumber }} </span>
          <v-spacer></v-spacer>
          <v-chip :color="getColor(order.status)" dark>{{ order.status }}</v-chip>
        </v-card-title>

        <v-card-text>
          <p>Set new order status</p>
          <v-select
            v-model="selectedState"
            :items="orderStates"
            label="Select State"
            item-color="secondary"
            solo
            class="mr-5"
          ></v-select>
        </v-card-text>

        <v-card-actions class="pa-5">
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            text
            @click="closeDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="secondary"
            text
            @click="updateOrderStatus"
          >
            Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { firestore } from "@/main"

export default {
    name: "CartItem",
    props: {
        dialog: Boolean,
        order: Object
    },
    data: () => {
        return {
            orderStates: ['Scheduled', 'In Progress', 'Completed'],
            selectedState: undefined,
        }
    },
    methods: {
        getColor (status) {
        if (status === 'Scheduled') return 'gray'
        else if (status === 'In Progress') return 'amber'
        else return 'green'
        },
        closeDialog () {
            this.selectedState = undefined
            this.$emit('update:dialog')
        },
        updateOrderStatus() {
            const target = { 
                'status': this.selectedState 
            }
            firestore.collection('orders').doc(this.order.id).set(target, { merge: true }).then( () => {
                this.$emit('update:dialog')
                this.selectedState = undefined
            })
        }
    }
}
</script>