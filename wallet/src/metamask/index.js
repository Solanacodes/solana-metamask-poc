import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";

const snapId = new URL("package.json", "http://localhost:8081/").toString();
const connection = new Connection(clusterApiUrl("testnet"), "single");

//eslint-disable-next-line no-undef
const metamask = ethereum;

export const connectToMetamask = async () => {
  await enableWallet();

  let pubKey = await getSolanaPubKey();

  if (!pubKey) {
    pubKey = await createSolanaAccount();
  }

  return await connection.getBalance(new PublicKey(pubKey), "single");
};

export const getSolanaPubKey = async () =>
  await metamask.send({
    method: "wallet_invokePlugin",
    params: [
      snapId,
      {
        method: "getSolanaPubKey"
      }
    ]
  });

export const createSolanaAccount = async () =>
  await metamask.send({
    method: "wallet_invokePlugin",
    params: [
      snapId,
      {
        method: "createSolanaAccount"
      }
    ]
  });

export const enableWallet = async () =>
  await metamask.send({
    method: "wallet_enable",
    params: [
      {
        wallet_plugin: { [snapId]: {} }
      }
    ]
  });
