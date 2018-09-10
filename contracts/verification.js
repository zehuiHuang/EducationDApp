const web3 = require("./web3")

//let gasPrice = "4000000000"
//let gas = "5000000"
let gasPrice = "0"
let gas = "5000000"

var jsonContract = require('./EducationContracts/build/contracts/Verification.json');


let deploy = (stuAddress, prikey) => {
    return new Promise((resolve, reject) => {
        let account = web3.eth.accounts.wallet.add(prikey)
        let transactionHash = ""
        let deployedAddress = ""
        let contract = new web3.eth.Contract(jsonContract.abi)
        contract.deploy({
                data: jsonContract.bytecode,
                arguments: [stuAddress]
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


let addFile = (
    contractAddress,
    prikey,
    sha3data,
    stuSigned,
    edu0Signed,
    edu1Signed) => {
    return new Promise((resolve, reject) => {
        sha3data = "0x" + sha3data
        stuSigned = JSON.parse(stuSigned)
        edu0Signed = JSON.parse(edu0Signed)
        edu1Signed = JSON.parse(edu1Signed)
        let contract = new web3.eth.Contract(
            jsonContract.abi, contractAddress)
        let account = web3.eth.accounts.wallet.add(prikey)
        contract.methods.addMultisigFile(
                sha3data,
                stuSigned.v,
                stuSigned.r,
                stuSigned.s,
                edu0Signed.v,
                edu0Signed.r,
                edu0Signed.s,
                edu1Signed.v,
                edu1Signed.r,
                edu1Signed.s
            ).send({
                from: account.address,
                gas: gas,
                gasPrice: gasPrice
            })
            .then(function(receipt) {
                resolve(receipt)
            })
            .catch(reject)
    })
}
exports.addFile = addFile


let verifySha3data = (contractAddress, sha3data) => {
    return new Promise((resolve, reject) => {
        let sha3 = "0x" + sha3data
        let contract = new web3.eth.Contract(
            jsonContract.abi, contractAddress)
        contract.methods.verifyFile(sha3).call()
            .then(resolve)
            .catch(resolve)
    })
}
exports.verifySha3data = verifySha3data
