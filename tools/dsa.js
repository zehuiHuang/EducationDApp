/**
 * 椭圆曲线DSA（ECDSA）签名和解码
 */

const util = require("ethereumjs-util")


/*
 * 测试账号
  助记词：say poverty beef magic dwarf blouse mad gadget round amount suspect around
	衍生路径： m/44'/60'/0'/24
	私钥：8d2cad459a7b4320ff19e5ed8c8b2e11139e6e4e75291db2dc3502b18b5a2302
	普通地址：0xb8e9947119e62f6a9eec1923a7f959ff55c14724
	校验地址：0xb8e9947119e62F6A9EEc1923A7F959Ff55c14724
	*/

/*
 * 签名
 * 对原始签名方法进行封装，时其输入输出均为通用字符串
 * 输入通用私钥和需要签名的字符串
 * 输出字符串形式的签名数据
 */
exports.ecsign = (prikey, sha3data) => {
		sha3data = Buffer.from(sha3data, "hex")
    prikey = Buffer.from(prikey, "hex")
    if (!util.isValidPrivate(prikey))
        throw new Error("not valid prikey!")
    let signedData = util.ecsign(sha3data, prikey)
    signedData.r = "0x" + signedData.r.toString("hex")
    signedData.s = "0x" + signedData.s.toString("hex")
    return JSON.stringify(signedData)
}


//let msg = this.ecsign("8d2cad459a7b4320ff19e5ed8c8b2e11139e6e4e75291db2dc3502b18b5a2302"
//				,"我是一条信息")
//console.log(msg)

/*
 * 验证签名
 * 输入为签名数据和原始数据
 * 输出为签名者的以太坊地址
 */
exports.ecrecover = (signedData, sha3data) => {
    signedData = JSON.parse(signedData)
    signedData.r = Buffer.from(signedData.r, "hex")
    signedData.s = Buffer.from(signedData.s, "hex")
    let pubkey = util.ecrecover(sha3data, signedData.v, signedData.r, signedData.s)
    let address = util.pubToAddress(pubkey)
    return address.toString("hex")
}


//let address = this.ecrecover('{"r":"a09d002f44e5ac31de6f414cce183dc37ed39f8d65114f8f4ab21169f7729afd","s":"098dea0f05b6f8eb54f6c611f29f00827347e3169aad02b33bd17cfd602e96d4","v":28}',"我是一条信息")
//console.log(address)
