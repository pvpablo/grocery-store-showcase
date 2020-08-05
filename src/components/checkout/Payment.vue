  <template>
    <v-card
      class="mx-auto mb-5 pa-2"
    >
      <v-card-actions
        class=""
      >
        <v-btn color="secondary">
          Add Payment Card
        </v-btn>
      </v-card-actions>

      <v-row>
        <v-col cols="12">Payment Methods</v-col>
        <v-col cols="12 cards">
          <img v-bind:class="{ active: cardType ==='amex'}" src="@/assets/cards/amex.png"/>
          <img v-bind:class="{ active: cardType ==='mastercard'}" src="@/assets/cards/mastercard.png"/>
          <img v-bind:class="{ active: cardType ==='visa'}" src="@/assets/cards/visa.png"/>
          <img v-bind:class="{ active: cardType ==='discovery'}" src="@/assets/cards/discover.png"/>
        </v-col>
        <v-col class="pr-3">
          <h6>Payment data protected by Grocery Store Showcase with encryption</h6>
        </v-col>

        <v-col cols="12" sm="12">
            <v-form>
            <v-text-field @input="checkExist($event)"
                          v-model="placeholder"
                          label="Type your credit card number"
                          outlined
            ></v-text-field>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :value="cvv"
                    autocomplete="off"
                    label="CVV"
                    outlined
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="date"
                    label="Expiry Date (MM/YY)"
                    outlined
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Card Holder Name"
                outlined
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                outlined
                required
              ></v-text-field>

              <v-text-field
                v-model="mobile"
                label="Mobile Number"
                outlined
              ></v-text-field>

              <v-text-field
                v-model="zipcode"
                label="Zip Code"
                outlined
                required
              ></v-text-field>

              <v-btn @click="cancel" class="mr-3 mb-1" color="secondary" dark>
                Cancel
              </v-btn>
              <v-btn @click="submit" class="mr-3 mb-1" color="secondary" dark>
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