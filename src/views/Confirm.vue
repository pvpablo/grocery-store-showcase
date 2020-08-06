<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Thanks for your shop
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex flex-wrap">
        We're working in your order, you can to the store the next
        {{pickupDate}} at and pick up with the next number {{orderNumber}}, don't forget bring an ID.
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { firestore } from '@/main'

export default {
  name: 'HelloWorld',
  components: {

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
      pickupDate: generateDate()
    }
  },
  firestore () {
    return {
      categories: firestore.collection('categories')
    }
  },
}
</script>

<style lang="sass">

.v-card__subtitle, .v-card__text, .v-card__title
  padding: 8px 0px 0px 16px !important

.v-card__actions
  padding: 0px 0px 5px 8px !important
</style>
