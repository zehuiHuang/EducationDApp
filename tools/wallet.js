const bip39 = require('bip39')
const ethwallet = require("ethereumjs-wallet")
const hdkey = require('ethereumjs-wallet/hdkey')

const DEFAULT_PATH = "m/44'/60'/0'/24"

let generate = path => {
    let mnemonic = bip39.generateMnemonic()
    let seed = bip39.mnemonicToSeed(mnemonic)
    path = path || DEFAULT_PATH
    let hdwallet = hdkey.fromMasterSeed(seed)
    let wallet = hdwallet.derivePath(path).getWallet()
    let pubkey = "0x" + wallet.getPublicKey().toString("hex")
	  let prikey = wallet.getPrivateKey().toString("hex")
    let checksum = wallet.getChecksumAddressString()
    let address = checksum.toLowerCase()
		return {mnemonic,path,prikey,address,checksum}
}

module.exports = generate
