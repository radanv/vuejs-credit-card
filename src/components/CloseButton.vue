<template>
  <button class="close-button" onclick="location.reload(true)">
    <i class="fas fa-times"></i>
  </button>
</template>

<script>
export default {
  name: "CloseButton",
  props: ["type"],
};
</script>

<style scoped>
.close-button {
  position: absolute;
  left: 0;
  top: 0;
  color: #ffffff;
  font-size: 25px;
  background: none;
  border: none;
  padding: 5px 15px;
  cursor: pointer;
}
</style>
