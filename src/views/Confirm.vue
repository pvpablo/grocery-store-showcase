<template>
  <v-container class="mt-9 mb-16">
    <v-row>
      <v-col cols="12" sm="8">
        <v-card>
          <v-container class="text-center text--lighten-5 mytext mb-16">
            <h2 class="ma-10 text-h3" >Thanks for your shop!</h2>
            <p>You are awesome <span>{{name}}</span> </p>
            <p>We're working to get your order done.<br/> You can pick up at the store on</p>
            <p><span>{{order[0].date}}</span> <span>{{order[0].time}}</span></p>
            <p>You'll need the next order number:</p>
            <p><span>{{order[0].id}}</span></p>
            <p>Don't forget bring your ID.</p>
          </v-container>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card>
          <v-container>
            <v-card-actions class="pr-1">
              <v-btn color="secondary" @click="goHome()" block>
                Continue Shopping
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import firebase from 'firebase';
import router from "@/router";
import {firestore} from "@/main";

export default {
  name: 'Confirm',
  components: {

  },
  methods:{
    goHome: function(){
      router.push("/")
    }
  },
  data: () => {
    return {
      name: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    }
  },
  firestore() {
    return {
      order: firestore
                .collection("orders")
                .where("uid", "==", this.uid)
                .orderBy("created", "desc")
                .limit(1)
      ,
    };
  },
}
</script>

<style lang="sass">

.v-card__subtitle, .v-card__text, .v-card__title
  padding: 8px 0px 0px 16px !important

.v-card__actions
  padding: 0px 0px 5px 8px !important

.mytext p
  font-size: 23px
.mytext span
  font-weight: bold

</style>
