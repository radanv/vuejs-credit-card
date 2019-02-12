<template>
  <form
    id="CreditCardForm"
    @submit.prevent="handleSubmit"
    action=""
    method="post"
  >
    <div class="col-md-10">
      <div class="row">
        <div class="form-group">
          <label for="cardNumber">Card Number</label>
          <input
            type="text"
            v-model="card.cardNumber"
            v-validate="{ required: true, min: 19, credit_card: true }"
            v-mask="masks.cardNumber"
            class="form-control"
            name="cardNumber"
            id="cardNumber"
            placeholder="1234 5678 9123 4567"
            :class="{ 'is-invalid': submitted && errors.has('cardNumber') }"
          />
          <div
            v-if="submitted && errors.has('cardNumber')"
            class="invalid-feedback"
          >
            {{ errors.first("cardNumber") }}
          </div>
        </div>
        <div class="form-group">
          <label for="cardHolder">Cardholder Name</label>
          <input
            type="text"
            class="form-control"
            name="cardHolder"
            id="cardHolder"
            v-model="card.cardHolder"
            v-validate="{ required: true, alpha_spaces: true }"
            v-mask="masks.cardHolder"
            placeholder="Sanjana Singh"
            :class="{ 'is-invalid': submitted && errors.has('cardHolder') }"
          />
          <div
            v-if="submitted && errors.has('cardHolder')"
            class="invalid-feedback"
          >
            {{ errors.first("cardHolder") }}
          </div>
        </div>
      </div>
    </div>
    <img
      v-bind:src="creditCardImage"
      v-bind:alt="creditCardAlt"
      class="visa-logo"
    />
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="DateMonth">Expiration</label>
          <div class="row">
            <div class="col-md-6">
              <input
                v-model="card.cardDateMonth"
                class="form-control"
                name="DateMonth"
                id="DateMonth"
                v-validate="{ required: true, verify_day_and_month: true, verify_date: true }"
                v-mask="masks.cardDateMonth"
                placeholder="01/12"
                :class="{
                  'is-invalid': submitted && errors.has('DateMonth')
                }"
              />
              <div
                v-if="submitted && errors.has('DateMonth')"
                class="invalid-feedback"
              >
                {{ errors.first("DateMonth") }}
              </div>
            </div>
            <div class="col-md-6">
              <input
                v-model="card.cardYear"
                class="form-control"
                name="cardYear"
                id="cardYear"
                v-validate="{ required: true, verify_year: true, verify_date:true }"
                v-mask="masks.cardYear"
                placeholder="2019"
                :class="{
                  'is-invalid': submitted && errors.has('cardYear')
                }"
              />
              <div
                v-if="submitted && errors.has('cardYear')"
                class="invalid-feedback"
              >
                {{ errors.first("cardYear") }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <label for="cvv" class="cvv">CVV</label>
          <input
            type="text"
            v-model="card.cardCVV"
            v-validate="{ required: true, digits: 3 }"
            v-mask="masks.cardCVV"
            class="form-control"
            name="cardCVV"
            id="cvv"
            placeholder="123"
            :class="{ 'is-invalid': submitted && errors.has('cardCVV') }"
          />
          <div
            v-if="submitted && errors.has('cardCVV')"
            class="invalid-feedback"
          >
            {{ errors.first("cardCVV") }}
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <button type="submit" class="btn-submit">
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import CreditCardImage from "../assets/images/visa-logo.png";

export default {
  name: "CreditCardForm",
  data: function() {
    return {
      creditCardImage: CreditCardImage,
      creditCardAlt: "VISA",
      masks: {
        cardNumber: "####-####-####-####",
        cardHolder: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        cardDateMonth: "##/##",
        cardYear: "####",
        cardCVV: "###"
      },
      card: {
        cardNumber: "",
        cardHolder: "",
        cardDateMonth: "",
        cardYear: "",
        cardCVV: ""
      },
      submitted: false
    };
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      this.$validator.extend("verify_day_and_month", {
        getMessage: `The day and month are not valid`,
        validate: value =>
          new Promise(resolve => {
            const exDay = value.substr(0, 2);
            const exMonth = value.substr(-2, 2);
            resolve({
              valid: exMonth < 13 && exDay < 32
            });
          })
      });
      this.$validator.extend("verify_year", {
        getMessage: `The year is not valid`,
        validate: value =>
          new Promise(resolve => {
            const currentDate = new Date();
            resolve({
              valid: value >= currentDate.getFullYear()
            });
          })
      });
      this.$validator.extend("verify_date", {
        getMessage: `The expiration date cannot be in the past`,
        validate: value =>
          new Promise(resolve => {
            const exDay = this.card.cardDateMonth.substr(0, 2);
            const exMonth = this.card.cardDateMonth.substr(-2, 2);
            const exYear = this.card.cardYear;
            var today = new Date();
            var someday = new Date();
            someday.setFullYear(exYear, exMonth - 1, exDay);
            resolve({
              valid: value && someday > today
            });
          })
      });
      this.$validator.validate().then(valid => {
        if (valid) {
          alert(
            "SUCCESS!! :-)\n\n" +
              JSON.stringify([
                this.card.cardNumber,
                this.card.cardHolder,
                this.card.cardDateMonth,
                this.card.cardYear
              ])
          );
        }
      });
    }
  }
};
</script>

<style scoped>
.form-group {
  margin: 15px 0 0;
}
</style>
