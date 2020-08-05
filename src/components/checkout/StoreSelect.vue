<template>
  <v-card
    class="mx-auto mb-5 pa-2"
  >
    <v-card-actions
      class="pl-1"
      v-if="state.step==='empty'"
    >
      <v-btn color="secondary" @click="changeStep('select')">
        Select your store
      </v-btn>
    </v-card-actions>

    <v-row   v-if="state.step === 'select' ">
      <v-col cols="12" sm="12">
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
      <v-col cols="12" sm="12">
        <v-btn color="secondary" @click="cancel()">
          Cancel
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="state.step === 'done' && state.selection">
      <v-col cols="12" sm="12">
        You could pick up your order in
      </v-col>
      <v-col cols="12" sm="3">
        <v-img :src="state.selection.img" height="140"></v-img>
      </v-col>
      <v-col cols="12" sm="9">
        <p>{{state.selection.name}}</p>
        <p>{{state.selection.address}}</p>
        <p>{{state.selection.phone}}</p>
      </v-col>
    </v-row>

    <v-card-actions class="pl-1" v-if="state.step === 'done' && state.selection ">
      <v-btn color="secondary" @click="changeStep('select')">
        Change store
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { getDownloadURL } from '@/utils/firebaseStorage.js'
  export default {
    name: "StoreSelect",
    props: ['stores'],
    components: {
    },
    data () {
      return {
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
          name: store.name ,
          address: store.address,
          phone: store.phone,
          img:  await getDownloadURL(store.thumbnailRef)
        };
        this.changeStep('done');
      },
      cancel : function () {
        console.log(this.state.selection)
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