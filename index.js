wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  switch (requestObject.method) {
    case 'confirm':
      return wallet.send({
        method: 'confirm',
        params: [`Please confirm!`]
      })
    default:
      throw new Error('Method not found.')
  }
})
