<template>
  <div class="product-card">
    <CloseButton></CloseButton>
    <div class="col-md-5">
      <div class="product-item">
        <img v-bind:src="productImage" v-bind:alt="productAlt" />
      </div>
    </div>
    <div class="col-md-5">
      <div class="product-title">
        <p>$ 2500</p>
      </div>
      <div class="product-price">
        <p>PUMA SHOE (BLUE)</p>
      </div>
    </div>
  </div>
</template>

<script>
import CloseButton from "./CloseButton";
import ProductImage from "../assets/images/product-pic.png";
export default {
  name: "ProductDetails",
  components: { CloseButton },
  props: ["type"],
  data: function() {
    return {
      productImage: ProductImage,
      productAlt: "Shoes"
    };
  }
};
</script>

<style scoped>
.product-card {
  position: absolute;
  background: linear-gradient(to right, #c5e4df 0%, #5fa69e 100%);
  width: 620px;
  height: 400px;
  box-shadow: -10px 10px 25px rgba(105, 178, 171, 0.5);
  border-radius: 16px;
  -moz-border-radius: 16px;
  -webkit-border-radius: 16px;
  text-align: center;
}
.product-item {
  width: 200px;
  height: 200px;
  min-height: 150px;
  margin: 15px;
  padding: 20px;
  margin-top: 60px;
}
.product-item img {
  height: 150px;
}
.product-title {
}
.product-title p {
  text-transform: uppercase;
  color: #ffffff;
  font-weight: 800;
  font-size: 24px;
}
.product-price {
}
.product-price p {
  text-transform: uppercase;
  color: #ffffff;
}
</style>
