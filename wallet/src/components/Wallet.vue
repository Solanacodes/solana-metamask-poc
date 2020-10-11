<template>
<div id="wallet-container">
  <div id="connect-button">Connect</div>
</div>
</template>

<script>
export default {
  name: 'Wallet',
  props: {
    msg: String
  }
}
</script>

<style scoped>
  #wallet-container {
    height: 100vh;
    width: 100%;
  }

  #connect-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 50px;
    width: 125px;
    background: lightskyblue;
    color: white;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: .2s;
    box-shadow: rgb(207, 215, 226) 6px 6px 12px, rgb(242, 242, 247) -12px -12px 24px -2px;
  }

  #connect-button:hover {
    background: rgb(81, 183, 247);
  }
</style>
