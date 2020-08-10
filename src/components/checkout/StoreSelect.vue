<template>
  <v-card
    class="mx-auto mb-5 pa-2"
  >
    <v-row v-if="state.step === 'select' || state.step === 'time' ">
      <v-col cols="12" sm="12">
        <v-col cols="12" sm="12">
          Available Stores
        </v-col>
      <v-select
        @change="selectStore($event)"
        solo
        hide-details
        item-color="secondary"
        item-text="name"
        return-object
        name="store"
        v-validate="'required'"
        :items="stores"
        label="Select a store"
      ></v-select>
      </v-col>

    </v-row>

    <v-row v-if="state.step === 'time' && state.selection">
      <v-col cols="12" sm="3">
        <v-img :src="state.selection.img" height="140"></v-img>
      </v-col>
      <v-col cols="12" sm="9">
        <p>{{state.selection.name}}</p>
        <p class="text--secondary">{{state.selection.address}}</p>
        <p class="text--secondary">{{state.selection.phone}}</p>
      </v-col>
      <v-col cols="12" sm="12">
        <p>Pick up window</p>
        <v-select
            solo
            hide-details
            item-text="label"
            item-color="secondary"
            return-object
            name="time"
            v-validate="'required'"
            @change="selectTime"
            :items="this.times"
            label="Select an available time for this store"
        ></v-select>
      </v-col>
    </v-row>

    <v-row v-if="state.step === 'done' && state.selection">
      <v-col cols="12" sm="3">
        <v-img :src="state.selection.img" height="140"></v-img>
      </v-col>
      <v-col cols="12" sm="9">
        <p>{{state.selection.name}}</p>
        <p class="text--secondary">{{state.selection.address}}</p>
        <p class="text-secondary">{{state.selection.phone}}</p>
        <p class="text--secondary">{{order.time}}</p>
      </v-col>
    </v-row>

    <v-card-actions class="pl-1">
      <v-btn color="secondary" v-if="state.step === 'empty'" @click="changeStep('select')">
        Select your store
      </v-btn>
      <v-btn color="secondary" v-if="state.step === 'time'" @click="cancel()">
        Cancel
      </v-btn>
      <v-btn color="secondary" v-if="state.step === 'time'" @click="changeStep('done')">
        Confirm selection
      </v-btn>
      <v-btn color="primary secondary--text" v-if="state.step === 'done'  && state.selection" @click="changeStep('select')">
        Change store
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { getDownloadURL } from '@/utils/firebaseStorage.js'
  export default {
    name: "StoreSelect",
    props: {
      stores: Array,
      order: Object
    },
    components: {
    },
    data () {
      return {
        times: [],
        state: {
          address: [],
          selection: undefined,
          step: 'empty'
        }
      }
    },
    methods: {
      changeStep: function(value) {
        this.state.step = value;
      },
      selectStore: async function (store) {
        this.state.selection = {
          id: store.id,
          name: store.name ,
          address: store.address,
          phone: store.phone,
          thumbnailRef: store.thumbnailRef,
          img:  await getDownloadURL(store.thumbnailRef)
        };
        this.times = [];
        for(let i = store.open; i < store.close; i++){
          this.times.push({value: i , label: `From ${i}:00 to ${i+1}:00`});
        }
        this.order.store = this.state.selection;
        this.changeStep('time');
      },
      selectTime: function($event){
        this.order.time = $event.label;
      },
      cancel : function () {
        if(this.state.selection){
          this.changeStep('done');
        }else{
          this.changeStep('empty');
        }
      },
    }
  };
</script>

<style lang="sass">
  .v-card__subtitle, .v-card__text, .v-card__title
    padding: 8px 0px 0px 16px !important
</style>