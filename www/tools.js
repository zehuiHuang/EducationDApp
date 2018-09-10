const express = require("express")
let router = express.Router()
const tools = require("../tools")
/**
 * @api {post} /tools/newwallet 1.NewWallet
 * @apiVersion 1.0.0
 * @apiName 创建一个新的钱包
 * @apiGroup Tools
 * @apiDescription
 * 每次访问都是一个全新的钱包，需要据数据记录一下；返回的参数全部记录进数据库就行，具体什么时候用到看情况；后面的接口中会提到需要用到以下的哪个参数；可以给整个系统生成一个固定的钱包，还可以给每个学生生成一个单独的钱包；
 *
 * @apiSuccess {String} mnemonic  助记词
 * @apiSuccess {String} path      衍生路径
 * @apiSuccess {String} prikey    私钥
 * @apiSuccess {String} address   普通地址
 * @apiSuccess {String} checksum  带校验位的地址
 * @apiSuccessExample {json} 返回示例
 * {
 *   err:0,
 *   msg:{
 *     mnemonic: "shield patch vital title kingdom warm firm choose cannon super submit reflect",
 *     path: "m/44'/60'/0'/24",
 *     prikey: "784bef31bc9114d199f74c2fc00c385e5890f33f7d98272e3df302f8fd23c598",
 *     address: "0x0406cbfc42e08c6af7581d65be7fe871b5a90bec",
 *     checksum: "0x0406CbFC42E08c6Af7581D65bE7fE871B5A90Bec"
 *   }
 * }
 *
 * @apiError 999:UNKNOW_ERROR 未知错误
 * @apiError 1000:INVAILD_PARAM 参数错误
 * @apiErrorExample {json} 错误示例
 * {err:999,msg:"UNKNOW_ERROR"}
 * {err:1000,msg:"INVAILD_PARAM"}
 
 */
router.post('/newwallet', (req, res, next) => {
    let wallet = tools.newWallet()
    res.send({
        err: 0,
        msg: wallet
    })
})


/**
 * @api {post} /tools/tostablejson 2. ToStableJSON
 * @apiVersion 1.0.0
 * @apiName 获取稳定JSON
 * @apiGroup Tools
 * @apiDescription
 * 需要上链的json比如通过这个接口转化一下，因为json键值的排序会导致计算的hash值不同；后面的接口会提到什么时候需要这个stablejson
 *
 * @apiParam {Object} json 普通的json,可以传json对象也可以传json string
 * @apiParamExample {JSON} 请求示例
 * {
 *	json: {
 *    name: "Jonathan",
 *    email: "1283912803@qq.com",
 *    address: "北京西二旗"
 *  }
 * }
 *
 * @apiSuccess {String} msg  经过字典排序后的stablejson，注意这里是String,详见示例
 * @apiSuccessExample {JSON} 返回示例
 * { err: 0,
 *  msg:
 *   '{"address":"北京西二旗","email":"1283912803@qq.com","name":"Jonathan"}' 
 * }
 *
 * @apiError 999:UNKNOW_ERROR 未知错误
 * @apiError 1000:INVAILD_PARAM 参数错误
 * @apiErrorExample {json} 错误示例
 * {err:999,msg:"UNKNOW_ERROR"}
 * {err:1000,msg:"INVAILD_PARAM"}
 
 */
router.post('/tostablejson', (req, res, next) => {
    if (!req.body.json)
        return next(new Error("INVAILD_PARAM"))
    res.send({
        err: 0,
        msg: tools.jsonStablize(req.body.json)
    })
})


/**
 * @api {post} /tools/tosha3 3. ToSha3
 * @apiVersion 1.0.0
 * @apiName 获取数据的sha3值
 * @apiGroup Tools
 * @apiDescription
 * 一般是把stablejson在这里转换成sha3值
 *
 * @apiParam {String} stablejson  需要转换的stablejson,这里必须是上一个接口返回的string
 * @apiParamExample {JSON} 请求示例
 * {
 *	stablejson: '{"address":"北京西二旗","email":"1283912803@qq.com","name":"Jonathan"}'
 * }
 *
 * @apiSuccess {String} sha3data 转换后的hash值字符串
 * @apiSuccessExample {JSON} 返回示例
 * { 
 *   err: 0,
 *   msg: '06d07133d6c7980ca4c1d68849e609107ecb99e536f9177862f24eee7366fde1' 
 * }
 *
 * @apiError 999:UNKNOW_ERROR 未知错误
 * @apiError 1000:INVAILD_PARAM 参数错误
 * @apiErrorExample {json} 错误示例
 * {err:999,msg:"UNKNOW_ERROR"}
 * {err:1000,msg:"INVAILD_PARAM"}
 */
router.post('/tosha3', (req, res, next) => {
    if (!req.body.stablejson)
        return next(new Error("INVAILD_PARAM"))
    res.send({
        err: 0,
        msg: tools.sha3(req.body.stablejson)
    })
})


/**
 * @api {post} /tools/rcsign 4. RCsign
 * @apiVersion 1.0.0
 * @apiName 椭圆曲线签名
 * @apiGroup Tools
 * @apiDescription 
 * 后面接口中会提到这个什么时候用，这个方法单独分开是为了以后完全去中心化作准备
 * 
 * @apiParam {String} prikey 需要用来签名的私钥 
 * @apiParam {String} sha3data   需要签名的已经sha3过的数据
 * @apiParamExample {json} 请求示例
 * {
 *	prikey: "83da08c702c5d0dea2449ffbb3bfc370bf860161cca404c176761eddb2999b34",
 *  sha3data : "06d07133d6c7980ca4c1d68849e609107ecb99e536f9177862f24eee7366fde1"	
 * }
 *
 * @apiSuccess {String} msg 签名结果，注意这里也是一个String，虽然形式上是json,详见示例
 * @apiSuccessExample {json} 返回示例
 * { 
 * err: 0,
 * msg: 
 *   '{"r":"7c02269b05c50c2d8213422ecf940009907292b38af519e7b4cea239d4829ad1","s":"0cc0bb5dfe1e77d9b35fe3d64336a0f74332e4fd1317610f5997cb1110c5b028","v":28}' 
	 } 
 *
 * @apiError 999:UNKNOW_ERROR 未知错误
 * @apiError 1000:INVAILD_PARAM 参数错误
 * @apiErrorExample {json} 错误示例
 * {err:999,msg:"UNKNOW_ERROR"}
 * {err:1000,msg:"INVAILD_PARAM"}
 **/
router.post('/rcsign', (req, res, next) => {
    if (!req.body.prikey || !req.body.sha3data)
        return next(new Error("INVAILD_PARAM"))
    res.send({
        err: 0,
        msg: tools.ecsign(req.body.prikey, req.body.sha3data)
    })
})

module.exports = router
