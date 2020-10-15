const bip39 = require('bip39');
const bip32 = require('bip32');
const nacl = require('tweetnacl');
const Account = require('@solana/web3.js').Account;

wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  switch (requestObject.method) {
    case 'confirm':
      {
        return wallet.send({
          method: 'confirm',
          params: [`Please confirm!${JSON.stringify(requestObject)}`]
        })
      }
    case 'createSolanaAccount': {
      if (wallet.getPluginState()) {
        const res = await wallet.send({
          method: 'confirm',
          params: [`You already have a Solana account configured inside this snap. Are you sure you want to overwrite it?`]
        })
        if (!res) {
          return false;
        }
      }

      const mnemonic = bip39.generateMnemonic(128);
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const acc = getAccountFromSeed(seed, 0);
      wallet.updatePluginState({mnemonic, seed, publicKey: acc.publicKey.toString()});
      return acc.publicKey.toString();
    }
    case 'getSolanaPubKey': {
      const pluginState = wallet.getPluginState();
      if (!pluginState) {
        return false;
      } else {
        return pluginState.publicKey;
      }
    }
    default:
      throw new Error('Method not found.')
  }
})

function getAccountFromSeed(seed, walletIndex, accountIndex = 0) {
  const derivedSeed = bip32
    .fromSeed(seed)
    .derivePath(`m/501'/${walletIndex}'/0/${accountIndex}`).privateKey;
  return new Account(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey);
}
