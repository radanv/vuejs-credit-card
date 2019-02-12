<template xmlns:v-attr="http://www.w3.org/1999/xhtml">
  <div class="wrapp" id="app2">
    <div class="product-box">
      <ProductDetails></ProductDetails>
    </div>
    <div class="credit-card-back">
      <p>PAYMENT DETAIL</p>
      <CreditCardForm></CreditCardForm>
    </div>
    <!--credit-card-back-->
  </div>
  <!--wrapp-->
</template>

<script>
import ProductDetails from "./components/ProductDetails";
import CreditCardForm from "./components/CreditCardForm";
export default {
  name: "app2",
  components: { ProductDetails, CreditCardForm }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
