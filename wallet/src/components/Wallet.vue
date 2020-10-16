<template>
  <div id="wallet-container">
    <div id="balance">Balance: {{ balance ?? "--" }}</div>
    <div
      v-if="state === states.WAITING_TO_CONNECT"
      id="connect-button"
      @click="connect"
    >
      Connect
    </div>
    <div v-else id="send-container">
      <div id="recipient-address">Recipient Address</div>
      <div id="amount-to-send">Amount</div>
      <input id="address-input" type="text" v-model="recipientAddress" />
      <input id="amount-input" type="number" v-model="amount" />
      <input id="send-button" type="submit" value="Send" />
    </div>

    <div @click="send">Send Alert</div>
  </div>
</template>

<script>
import { ref } from "vue";
import { getSolanaPubKey, connectToMetamask } from "../metamask";
import states from "../states";

export default {
  name: "Wallet",
  props: {
    msg: String
  },
  setup() {
    const balance = ref(null);
    const state = ref(states.WAITING_TO_CONNECT);
    const connect = async () => {
      balance.value = await connectToMetamask();
      state.value = states.CONNECTED;
    };

    const recipientAddress = ref("");
    const amount = ref(0);

    const send = async () => {
      try {
        const res = await getSolanaPubKey();
        console.log(res);
      } catch (err) {
        console.error(err);
        alert("Problem happened: " + err.message || err);
      }
    };

    return { connect, send, states, state, balance, recipientAddress, amount };
  }
};
</script>

<style scoped>
#wallet-container {
  height: 100vh;
  width: 100%;
}

#connect-button {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50px;
  width: 125px;
  background: rgb(104, 197, 255);
  color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: rgb(207, 215, 226) 6px 6px 12px,
    rgb(242, 242, 247) -12px -12px 24px -2px;
}

#connect-button:hover {
  background: rgb(26, 167, 255);
}

#balance {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
}

#send-container {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50px;
  display: flex;
}

#address-input {
  height: 100%;
  width: 300px;
  border: none;
  box-shadow: rgb(207, 215, 226) 6px 6px 12px,
    rgb(242, 242, 247) -12px -12px 24px -2px;
  border-radius: 5px;
  font-size: 18px;
  padding: 0 15px 0 15px;
  border: 1px solid rgb(248, 248, 248);
  box-sizing: border-box;
}

#address-input:focus {
  outline-color: rgb(26, 167, 255);
}

#amount-input {
  height: 100%;
  width: 120px;
  border: none;
  box-shadow: rgb(207, 215, 226) 6px 6px 12px,
    rgb(242, 242, 247) -12px -12px 24px -2px;
  border-radius: 5px;
  font-size: 18px;
  padding: 0 10px 0 10px;
  margin-left: 10px;
  border: 1px solid rgb(248, 248, 248);
  box-sizing: border-box;
}

#amount-input:focus {
  outline-color: rgb(26, 167, 255);
}

#send-button {
  width: 125px;
  background: rgb(104, 197, 255);
  transform: translateY(0.5px);
  font-size: 14px;
  color: white;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
  box-shadow: rgb(207, 215, 226) 6px 6px 12px,
    rgb(242, 242, 247) -12px -12px 24px -2px;
  transition: 0.3s;
  border: none;
}

#send-button:hover {
  background: rgb(26, 167, 255);
}

#send-button:focus {
  outline: none;
  background: rgb(26, 167, 255);
}

#recipient-address {
  position: absolute;
  top: -50%;
}

#amount-to-send {
  position: absolute;
  top: -50%;
  left: 55%;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
