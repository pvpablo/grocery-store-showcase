<template>
  <v-card class="mx-auto mb-5 pa-2">
    <v-card-actions class="pl-1" v-if="state.step === 'empty'">
      <v-btn color="secondary" @click="changeStep('addcard')">
        Add Payment Card
      </v-btn>
    </v-card-actions>

    <v-row v-if="state.step === 'select'">
      <v-col cols="12" sm="12">
        <v-select
          @change="addPaymentCard($event)"
          solo
          hide-details
          item-color="secondary"
          item-text="name"
          return-object
          name="store"
          v-validate="'required'"
          :items="cards"
          label="Add your Card"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="12">
        <v-btn color="secondary" @click="cancel()">
          Cancel
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="state.step === 'done'">
      <v-col cols="12" sm="12">
        <v-row>
          <v-col class="icon" cols="12" sm="2">
            <img v-if="cardType === 'amex'" src="@/assets/cards/amex.png" />
            <img
              v-if="cardType === 'mastercard'"
              src="@/assets/cards/mastercard.png"
            />
            <img v-if="cardType === 'visa'" src="@/assets/cards/visa.png" />
            <img
              v-if="cardType === 'discovery'"
              src="@/assets/cards/discover.png"
            />
          </v-col>
          <v-col cols="12" sm="9">
            <p>Card {{ state.card.number.replace(/\d(?=\d{4})/g, "*") }}</p>
            <p>Card Holder Name {{ state.card.name }}</p>
            <p>Expiration Date {{ state.card.date }}</p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12">
        <v-btn color="secondary" @click="changeStep('addcard')">
          Change Payment Method
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="state.step === 'addcard'">
      <v-col cols="12">Payment Methods</v-col>
      <v-col cols="12 cards">
        <img
          v-bind:class="{ active: cardType === 'amex' }"
          src="@/assets/cards/amex.png"
        />
        <img
          v-bind:class="{ active: cardType === 'mastercard' }"
          src="@/assets/cards/mastercard.png"
        />
        <img
          v-bind:class="{ active: cardType === 'visa' }"
          src="@/assets/cards/visa.png"
        />
        <img
          v-bind:class="{ active: cardType === 'discovery' }"
          src="@/assets/cards/discover.png"
        />
      </v-col>
      <v-col class="pr-3">
        <!--<v-icon dark>mdi-lock</v-icon>-->
        <h6 class="protect__data">
          Payment data protected by Grocery Store Showcase with encryption
        </h6>
      </v-col>

      <v-col cols="12" sm="12">
        <v-form>
          <v-text-field
            @input="checkExist($event)"
            v-model="state.card.number"
            label="Type your credit card number"
            type="number"
            outlined
            color="subtitle"
            :error="state.error.number"
          ></v-text-field>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="state.card.cvv"
                label="CVV"
                type="number"
                outlined
                required
                color="subtitle"
                :error="state.error.cvv"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="state.card.date"
                label="Expiry Date (MM/YY)"
                outlined
                color="subtitle"
                :error="state.error.date"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-text-field
            v-model="state.card.name"
            label="Card Holder Name"
            type="string"
            outlined
            required
            color="subtitle"
            :error="state.error.name"
          ></v-text-field>

          <v-text-field
            v-model="state.card.email"
            label="E-mail"
            outlined
            required
            color="subtitle"
            :error="state.error.email"
          ></v-text-field>

          <v-text-field
            v-model="state.card.mobile"
            label="Mobile Number"
            type="string"
            outlined
            color="subtitle"
            :error="state.error.mobile"
          ></v-text-field>

          <v-text-field
            v-model="state.card.zipcode"
            type="number"
            label="Zip Code"
            outlined
            required
            color="subtitle"
            :error="state.error.zipcode"
          ></v-text-field>

          <v-btn @click="cancel" class="mr-3 mb-1" color="secondary" dark>
            Cancel
          </v-btn>
          <v-btn
            @click="saveCard($event)"
            class="mr-3 mb-1"
            color="secondary"
            dark
          >
            Use this Payment Method
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Payment",
  props: {
    order: Object,
  },
  data() {
    return {
      cardType: null,
      state: {
        selection: undefined,
        step: "empty",
        card: {
          number: 4111111111111111,
          date: '12/21',
          cvv: '123',
          name: "John Doe",
          email: 'john@example.com',
          mobile: '+1650-253-0000',
          zipcode: '94043',
        },
        error: {
          number: false,
          date: false,
          cvv: false,
          name: false,
          email: false,
          mobile: false,
          zipcode: false,
        },
      },
    };
  },
  methods: {
    validateCard: function(ccNum) {
      const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
      const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
      const amexpRegEx = /^(?:3[47][0-9]{13})$/;
      const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
      let type = undefined;

      if (visaRegEx.test(ccNum)) {
        type = "visa";
      } else if (mastercardRegEx.test(ccNum)) {
        type = "mastercard";
      } else if (amexpRegEx.test(ccNum)) {
        type = "amex";
      } else if (discovRegEx.test(ccNum)) {
        type = "discovery";
      }
      return type;
    },
    checkExist: function(event) {
      this.cardType = this.validateCard(event);
    },
    saveCard: function() {
      let error = false;
      delete this.state.card.cardType;
      Object.keys(this.state.card).map((key) => {
        this.state.error[key] = false;
        if (!this.state.card[key]) {
          this.state.error[key] = true;
          error = true;
        }
      });

      this.order.card = this.state.card;

      if (error) {
        return;
      }

      this.state.card.cardType = this.cardType;
      this.changeStep("done");
    },
    changeStep: function(value) {
      this.state.step = value;
    },
    cancel: function() {
      if (this.state.card.full) {
        this.changeStep("done");
      } else {
        this.changeStep("empty");
      }
    },
  },
};
</script>

<style lang="sass">
.v-card__subtitle, .v-card__text, .v-card__title
  padding: 8px 0px 0px 16px !important
.cards img, .icon img
  width: 35px
  opacity: 0.5
  margin-right: 10px
.icon img
  opacity: 1
  width: 90px
.cards img.active
  opacity: 1
.protect__data
  color: grey
</style>
