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
                <input type="text"
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
        </ul>
        <button type="submit" class="btn-submit">
            <i class="fas fa-arrow-right"></i>
        </button>
    </form>
</template>

<script>
    import CreditCardImage from "../assets/images/visa-logo.png";

    export default {
        name: "CreditCardForm",
        data: function () {
            return {
                creditCardImage: CreditCardImage,
                creditCardAlt: "VISA",
                inputTypes: [
                    {
                        model: "", validate: {required: true, min: 19, credit_card: true}, cssId: "cardNumber",
                        mask: "####-####-####-####", name: "cardNumber", placeholder: "4111-1111-1111-1111", label: "Card Number"
                    },
                    {
                        model: "", validate: {required: true, alpha_spaces: true},cssId: "cardHolder",
                        mask: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX", name: "cardHolder", placeholder: "Sanjana Singh", label: "Cardholder Name"
                    },
                    {
                        model: "", validate: {required: true, verify_day_and_month:true, verify_date:true},
                        mask: "##/##", name: "cardMonth", placeholder: "01/02", cssId: "cardMonth", label: "Expiration"
                    },
                    {
                        model: "", validate: {required: true, verify_date: true},
                        mask: "####", name: "cardYear", placeholder: "2019", cssId: "cardYear", label: "    "
                    },
                    {
                        model: "", validate: {required: true, digits: 3}, cssId: "cardCVV",
                        mask: "###", name: "cardCVV", placeholder: "123", label: "CVV"
                    },
                ],
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
                            const exDay = document.getElementById("cardMonth").value.substr(0, 2);
                            const exMonth = document.getElementById("cardMonth").value.substr(-2, 2);
                            resolve({
                                valid: exMonth < 13 && exDay < 32
                            });
                        })
                });/*
                this.$validator.extend("verify_year", {
                    getMessage: `The year is not valid`,
                    validate: value =>
                        new Promise(resolve => {
                            const currentDate = new Date();
                            resolve({
                                valid: value >= currentDate.getFullYear()
                            });
                        })
                });*/
                this.$validator.extend("verify_date", {
                    getMessage: `The expiration date cannot be in the past`,
                    validate: value =>
                        new Promise(resolve => {
                            const exDay = document.getElementById("cardMonth").value.substr(0, 2);
                            const exMonth = document.getElementById("cardMonth").value.substr(-2, 2);
                            const exYear = document.getElementById("cardYear").value;
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
                        var cardNumber = document.getElementById("cardNumber").value;
                        var cardName = document.getElementById("cardHolder").value;
                        var cardMonth = document.getElementById("cardMonth").value;
                        var cardYear = document.getElementById("cardYear").value;

                        alert(
                            "SUCCESS!! :-)\n\n" +
                            JSON.stringify([
                                cardNumber, cardName, cardMonth, cardYear
                            ])
                        );
                    }
                });
            }
        }
    };
</script>

<style scoped>
    ul {
        margin:0;
        padding: 0;
        padding-top: 20px;
    }
    li {
        list-style: none;
        padding-top: 10px;
        margin-bottom: 10px;
    }
    li:first-child{
        width:235px;
    }
    li:first-child input{
        font-size: 20px;
    }
    li:nth-child(2){
        width:235px;
    }
    li:nth-child(3){
        width:80px;
        float: left;
    }
    li:nth-child(4){
        width:80px;
        float: left;
    }
    li:nth-child(5){
        width:100px;
        margin-left: 10px;
        float: left;
    }
</style>
