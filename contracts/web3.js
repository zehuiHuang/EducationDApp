const Web3 = require("web3")
const web3 = new Web3()
web3.setProvider(new Web3.providers.WebsocketProvider("ws://47.93.7.170:10002"))

/**
 * hearbeat websocket
 */
setInterval(() => {
    web3.eth.net.isListening()
        .then(() => {
            console.log("ws listening...")
        })
        .catch(e => {
            console.log("ws disconnected!")
            console.log(e)
            console.log("reconnecting...")
            web3.setProvider(new Web3.providers.WebsocketProvider(config.ws))
        })
}, 1000)

module.exports = web3 
