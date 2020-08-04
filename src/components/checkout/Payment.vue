<template>
  <v-card
    class="mx-auto mb-10 pa-2"
  >
    <v-row>
      <v-col cols="12">Payment Methods</v-col>
      <v-col cols="12 cards">
        <img v-bind:class="{ active: cardType ==='amex'}" src="@/assets/cards/amex.png"/>
        <img v-bind:class="{ active: cardType ==='mastercard'}" src="@/assets/cards/mastercard.png"/>
        <img v-bind:class="{ active: cardType ==='visa'}" src="@/assets/cards/visa.png"/>
        <img v-bind:class="{ active: cardType ==='discovery'}" src="@/assets/cards/discover.png"/>
      </v-col>
      <v-col cols="12" sm="9">
        <v-text-field @input="checkExist($event)"
                      v-model="placeholder"
                      label="Type your credit card number"
        ></v-text-field>

        <v-text-field
        ></v-text-field>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    name: "Payment",
    data () {
      return {
        cardType: null,
      }
    },
    methods: {
      validateCard: function (ccNum) {
        const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
        const amexpRegEx = /^(?:3[47][0-9]{13})$/;
        const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
        let type = undefined;

        if (visaRegEx.test(ccNum)) {
          type = "visa";
        } else if(mastercardRegEx.test(ccNum)) {
          type = "mastercard";
        } else if(amexpRegEx.test(ccNum)) {
          type = "amex";
        } else if(discovRegEx.test(ccNum)) {
          type = "discovery";
        }
        return type;


      },
      checkExist : function (event) {
        this.cardType = this.validateCard(event);
      }
    }
  };
</script>

<style lang="sass">
  .v-card__subtitle, .v-card__text, .v-card__title
    padding: 8px 0px 0px 16px !important
  .cards img
    width: 35px
    opacity: 0.5
    margin-right: 10px
  .cards img.active
    opacity: 1
</style>