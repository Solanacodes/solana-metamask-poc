<template>
  <Wallet msg="Welcome to Your Vue.js App" />
</template>

<script>
import Wallet from "./components/Wallet.vue";

export default {
  name: "App",
  components: {
    Wallet
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

* {
  padding: 0;
  margin: 0;
  font-family: "Roboto", sans-serif;
}
</style>
