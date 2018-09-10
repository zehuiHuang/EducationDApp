const web3 = require("./web3")
const Promise = require("bluebird")

//let gasPrice = "4000000000"
//let gas = "5000000"
let gasPrice = "0"
let gas = "5000000"

var jsonContract = require('./EducationContracts/build/contracts/File.json');


let deploy = (stuAddress, verificationAddress, prikey) => {
    return new Promise((resolve, reject) => {
        let account = web3.eth.accounts.wallet.add(prikey)
        let transactionHash = ""
        let deployedAddress = ""
        let contract = new web3.eth.Contract(jsonContract.abi)
        contract.deploy({
                data: jsonContract.bytecode,
                arguments: [stuAddress, verificationAddress]
            })
            .send({
                from: account.address,
                gas: gas,
                gasPrice: gasPrice,
            })
            .on("receipt", receipt => {
                transactionHash = receipt.transactionHash
            })
            .then(instance => {
                deployedAddress = instance
                    .options.address
                web3.eth.accounts.wallet.remove(account)
                return web3.eth.getTransactionReceipt(transactionHash)
            })
            .then(receipt => {
                let gasUsed = receipt.gasUsed
                let etherUsed = web3.utils.fromWei((gasUsed * gasPrice).toString())
                resolve(deployedAddress)
            })
            .catch(err => {
                reject(err)
                web3.eth.accounts.wallet.remove(account)
            })
    })
}
exports.deploy = deploy


let uploadFile = (contractAddress, prikey, encrypted) => {
    return new Promise((resolve, reject) => {
        let contract = new web3.eth.Contract(
            jsonContract.abi, contractAddress)
        let account = web3.eth.accounts.wallet.add(prikey)
        console.log(encrypted)
        contract.methods.uploadEncryptedFile(encrypted).send({
                from: account.address,
                gas: gas,
                gasPrice: gasPrice
            })
            .then(function(receipt) {
                resolve(receipt)
            })
    })
}
exports.uploadFile = uploadFile



let viewFiles = (contractAddress, prikey) => {
    return new Promise((resolve, reject) => {
        let contract = new web3.eth.Contract(
            jsonContract.abi, contractAddress)
        let account = web3.eth.accounts.wallet.add(prikey)
        let length = 0
        contract.methods.getNumberOfFiles().call({
                from: account.address,
            })
            .then(ret => {
                length = ret
                console.log("length is:" + length)
                let indexes = []
                for (let i = 0; i < length; i++) {
                    indexes.push(i)
                }
                return Promise.map(indexes, index => {
                    return contract.methods.viewFile(index).call({
                        from: account.address
                    })
                })
            })
            .then(resolve)
            .catch(reject)
    })
}
exports.viewFiles = viewFiles





