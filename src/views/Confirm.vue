<template>
  <v-container class="mt-9 mb-16">
    <v-row>
      <v-col cols="12" sm="8">
        <v-card>
          <v-container class="text-center text--lighten-5 mytext mb-16">
            <h2 class="ma-10 text-h3" >Thanks for your shop!</h2>
            <p>You are awesome <span>{{name}}</span> </p>
            <p>We're working to get your order done.<br/> You can pick up at the store on</p>
            <p><span>{{pickupDate}}</span> at <span>{{pickupHour}}:00</span></p>
            <p>You'll need the next order number:</p>
            <p><span>{{orderNumber}}</span></p>
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
    function generateDate(){
      function getRandomDate(from, to) {
        from = from.getTime();
        to = to.getTime();
        return new Date(from + Math.random() * (to - from));
      }
      const today = new Date() ;
      const next5Days = new Date();
      next5Days.setDate(next5Days.getDate() + 5 );
      const randomDate = getRandomDate(today,next5Days);
      const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' })
      const [{ value: month },,{ value: day },,] = dateTimeFormat.formatToParts(randomDate)
      return `${month}, ${day}`;
    }

    return {
      orderNumber: Math.floor(Math.random() * 999999) + 10000,
      pickupDate: generateDate(),
      pickupHour:  Math.floor(Math.random() * (18 - 10 + 1) + 10),
      name: firebase.auth().currentUser.displayName
    }
  },
  firestore () {
    return {
    }
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
