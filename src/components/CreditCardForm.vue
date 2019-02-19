<template>
  <form
    id="CreditCardForm"
    @submit.prevent="handleSubmit"
    action=""
    method="post"
  >
    <img
      v-bind:src="creditCardImage"
      v-bind:alt="creditCardAlt"
      class="visa-logo"
    />
    <ul>
      <li v-for="inputType in inputTypes">
        <label v-bind:for="inputType.name">{{ inputType.label }}</label>
        <input
          type="text"
          v-model="inputType.model"
          v-validate="inputType.validate"
          v-mask="inputType.mask"
          class="form-control"
          v-bind:name="inputType.name"
          v-bind:id="inputType.cssId"
          v-bind:placeholder="inputType.placeholder"
          :class="{ 'is-invalid': submitted && errors.has(inputType.name) }"
        />
        <span
          v-if="submitted && errors.has(inputType.name)"
          class="invalid-feedback"
        >
          {{ errors.first(inputType.name) }}
        </span>
      </li>
      <li>
        <label for="cardMonth"> Expiration </label>
        <select
          v-model="selectedMonth"
          v-validate="{required: true, check_month:true}"
          class="form-control"
          name="month"
          id="cardMonth"
          :class="{ 'is-invalid': submitted && errors.has('month') }"
        >
          <option v-for="month in months" v-bind:value="month.value">{{ month.text }}</option>
        </select>
        <span
                  v-if="submitted && errors.has('month')"
                  class="invalid-feedback"
          >
          {{ errors.first('month') }}
        </span>
      </li>
      <li>
        <label for="cardYear">&nbsp</label>
        <select
          v-model="selectedYear"
          v-validate="{required: true, check_year:true}"
          class=form-control
          name="year"
          id="cardYear"
          :class="{ 'is-invalid': submitted && errors.has('year') }"
        >
          <option v-for="year in years" v-bind:value="year.value">{{ year.text }}</option>
        </select>
        <span
                  v-if="submitted && errors.has('year')"
                  class="invalid-feedback"
          >
          {{ errors.first('year') }}
        </span>
      </li>
      <li>
        <label> CVV </label>
        <input
          v-model="cardCVV.model"
          v-validate="cardCVV.validate"
          v-mask="cardCVV.mask"
          class="form-control"
          v-bind:name="cardCVV.name"
          v-bind:id="cardCVV.cssId"
          v-bind:placeholder="cardCVV.placeholder"
          v-bind:type="cardCVV.type"
          :class="{ 'is-invalid': submitted && errors.has(cardCVV.name) }"
        />
        <span
          v-if="submitted && errors.has(cardCVV.name)"
          class="invalid-feedback"
        >
          {{ errors.first(cardCVV.name) }}
        </span>
      </li>
    </ul>
    <button type="submit" class="btn-submit">
      <i class="fas fa-arrow-right"></i>
    </button>
  </form>
</template>

<script>
import CreditCardImage from "../assets/images/visa-logo.png";
var CryptoJS = require("crypto-js");
var currentTime = new Date();
var exYear = currentTime.getFullYear();
export default {
  name: "CreditCardForm",
  data: function() {
    return {
      creditCardImage: CreditCardImage,
      creditCardAlt: "VISA",
      inputTypes: [
        {
          model: "",
          validate: { required: true, min: 19, credit_card: true },
          cssId: "cardNumber",
          mask: "####-####-####-####",
          name: "cardNumber",
          placeholder: "4111-1111-1111-1111",
          label: "Card Number"
        },
        {
          model: "",
          validate: { required: true, alpha_spaces: true },
          cssId: "cardHolder",
          mask: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          name: "cardHolder",
          placeholder: "Sanjana Singh",
          label: "Cardholder Name"
        }
      ],
      selectedMonth: "0",
      months: [
        { text: "Month", value: "0" },
        { text: "January", value: "1" },
        { text: "February", value: "2" },
        { text: "March", value: "3" },
        { text: "April", value: "4" },
        { text: "May", value: "5" },
        { text: "June", value: "6" },
        { text: "July", value: "7" },
        { text: "August", value: "8" },
        { text: "September", value: "9" },
        { text: "October", value: "10" },
        { text: "November", value: "11" },
        { text: "December", value: "12" }
      ],
      selectedYear: '0',
      years: [
        { text: "Year", value: "0" },
        { text: exYear, value: exYear },
        { text: exYear + 1, value: exYear + 1 },
        { text: exYear + 2, value: exYear + 2 },
        { text: exYear + 3, value: exYear + 3 },
        { text: exYear + 4, value: exYear + 3 }
      ],
      cardCVV: {
        model: "",
        validate: { required: true, digits: 3 },
        cssId: "cardCVV",
        type: "password",
        mask: "###",
        name: "CVV",
        placeholder: "***",
        label: "CVV"
      },
      submitted: false
    };
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
        this.$validator.extend("check_month", {
            getMessage: `Select the month`,
            validate: value =>
                new Promise(resolve => {
                    resolve({
                        valid: (value > 0) && (value < 13)
                    });
                })
        });
        this.$validator.extend("check_year", {
            getMessage: `Select the Year`,
            validate: value =>
                new Promise(resolve => {
                    resolve({
                        valid: value >= exYear
                    });
                })
        });
      this.$validator.validate().then(valid => {
        if (valid) {
          var cardNumber = document.getElementById("cardNumber").value;
          var cardName = document.getElementById("cardHolder").value;
          var cardMonth = document.getElementById("cardMonth").value;
          var cardYear = document.getElementById("cardYear").value;
          var cardCVV = document.getElementById("cardCVV").value;

          var data = [cardNumber, cardName, cardMonth, cardYear];

          // Encrypt
          var ciphertext = CryptoJS.AES.encrypt(
            JSON.stringify(data),
            cardCVV
          ).toString();

          alert("SUCCESS!! Encrypted \n\n" + ciphertext);
        }
      });
    }
  }
};
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  padding-top: 20px;
}
li {
  list-style: none;
  padding-top: 10px;
  margin-bottom: 10px;
  margin-right: 8px;
}
li:first-child {
  width: 235px;
}
li:first-child input {
  font-size: 20px;
}
li:nth-child(2) {
  width: 235px;
}
li:nth-child(3) {
  width: 105px;
  float: left;
}
li:nth-child(4) {
  width: 65px;
  float: left;
}
li:nth-child(5) {
  width: 100px;
  margin-left: 10px;
  float: left;
}
select {
  margin-left: -4px;
}
</style>
