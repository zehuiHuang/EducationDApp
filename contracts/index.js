const file = require("./file")
const verification = require("./verification")

let deploy = (stuAddress, prikey) => {
    return new Promise((resolve, reject) => {
        verificationAddress = ""
        fileAddress = ""
        verification.deploy(stuAddress, prikey)
            .then(ret => {
                verificationAddress = ret
                return file.deploy(
                    stuAddress,
                    verificationAddress,
                    prikey)
            })
            .then(ret => {
                fileAddress = ret
                resolve({
                    verificationAddress,
                    fileAddress
                })
            })
            .catch(reject)
    })
}

module.exports = {
    deploy,
    file,
    verification
}

//let prikey = "d23ad064ec2026a03ab0f85aa01c0d779ae09e16f4762e04dc5bbcc7ddb095a8"
//let address = "0x1d86902b770b2601907f36c8439184aba557421e"
//
//deploy(address, prikey)
//.then(console.log)
//.catch(console.log)
