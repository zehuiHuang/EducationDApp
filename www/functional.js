const express = require("express")
const contracts = require("../contracts")
let router = express.Router()

/**
 *
 * @api {post} /contracts/deployfile 1. DeployFile
 * @apiVersion 1.0.0
 * @apiName 创建新的智能档案
 * @apiGroup Contracts
 * @apiDescription 
 * 用学生提供的地址创建新的智能档案，本系统会以学校的身份为其签名。校方系统需要记录学生的两个档案地址
 *
 * @apiParam {String} stuAddress 学生地址
 * @apiParam {String} eduPrikey  校方账号的私钥
 * @apiParamExample {json} 请求示例
 * { 
 *   stuAddress: '0x6a91d146981c423d8f2f977ee599867b549af191',
 *   eduPrikey: '0x07c42381551f540fbef98db166dbfd4f5e01d2bf' 
 * }
 *
 * @apiSuccess {String} fileAddress 档案合约的地址
 * @apiSuccess {String} verificationAddress 验证合约的地址
 * @apiSuccessExample {json} 返回示例
 * { 
 *   err: 0,
 *   msg:
 *   { 
 *     verificationAddress: '0xf49077EAB48494d8303ba26112d9046087926990',
 *     fileAddress: '0x7A1C80fB788be1E659C300412651D29A29fb6b6e' 
 *   } 
 * }
 *
 * @apiError 999:UNKNOW_ERROR 未知错误
 * @apiError 1000:INVAILD_PARAM 参数错误
 * @apiErrorExample {json} 错误示例
 * {err:999,msg:"UNKNOW_ERROR"}
 * {err:1000,msg:"INVAILD_PARAM"}
 */
router.post('/deployfile', (req, res, next) => {
    if (!req.body.stuAddress || !req.body.eduPrikey)
        next(new Error("INVAILD_PARAM"))
    contracts.deploy(
            req.body.stuAddress,
            req.body.eduPrikey
        )
        .then(ret => {
            res.send({
                err: 0,
                msg: ret
            })
        })
        .catch(err => {
            console.error(err)
            next(err)
        })
})



/**
 * @api {post} /contracts/addfilerecord 2. AddFileRecord
 * @apiVersion 1.0.0
 * @apiName 为智能档案增加内容
 * @apiGroup Contracts
 * @apiDescription 
 * 多重签名上链学生成绩或者其他信息
 * 
 * @apiParam {String} stablejson 需要上链数据的stablejson
 * @apiParam {String} sha3file 上面那个stablejson经过sha3加密后的文件
 * @apiParam {String} stuSigned 学生账号签名的上述sha3file的椭圆曲线加密字符串
 * @apiParam {String} edu0Signed 某管理角色签名的上述sha3file的椭圆曲线加密字符串
 * @apiParam {String} edu1Signed 某管理角色签名的上述sha3file的椭圆曲线加密字符串
 * @apiParam {String} eduPrikey 校方系统号的私钥
 * @apiParam {String} fileAddress 学生file合约地址
 * @apiParam {String} verificationAddress 学生verificationAddress 合约地址
 * @apiParamExample {json} 请求示例
 *{ stablejson:
 *   '{"address":"北京西二旗","email":"1283912803@qq.com","name":"Jonathan"}',
 * sha3file:
 *  '06d07133d6c7980ca4c1d68849e609107ecb99e536f9177862f24eee7366fde1',
 * stuSigned:
 *  '{"r":"0x4b5c45f2164e6fd8d3535283322f2f895a9b2f3eb3568668c7f91435ed8786db","s":"0x28e65274c4ea086af46c8a5152c27f2758430342ccffafcc2a99006de97d4c0a","v":27}',
 * edu0Signed:
 *  '{"r":"0x343b229f1496f32ef1b500416f67083f41be1848656ad5149c4a9a55ece7b785","s":"0x292e943469bd98848cc64b8c8337b979b758a9ac1ec41a3ec8873b5b970c8d05","v":27}',
 * edu1Signed:
 *  '{"r":"0x1b17e2ff093e498e047f5d2b0410df07598af6849580cded23f2cd0992da54d1","s":"0x1917dc511477fb9fdfccc0936ac0839b3c02b28db77e37e76d3a83138fc8b302","v":27}',
 * eduPrikey:
 *  'a448ae15da37bb37ed3225fd937f5d548b838d7f2f252ba51f9bd509ac3079d4',
 * fileAddress: '0x5A7970A48B4d6B9ca9718a445ABAef0071C1f30F',
 * verificationAddress: '0x532390f4D76F5D548978BC8F64bE7225eD02c8F5' }
 *
 * @apiSuccess {Object} msg 上传成功的区块链数据，具体看示例
 * @apiSuccessExample {json} 返回示例
{ err: 0,
  msg:
   { blockHash:
      '0x140f550fa091791efb31bb3788a69ce4f673033bc3d6b8446e076f6d0b9862f7',
     blockNumber: 129637,
     contractAddress: null,
     cumulativeGasUsed: 133252,
     gasUsed: 133252,
     logsBloom:
      '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000080000000000000000000000000000000000002040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000',
     root: null,
     status: null,
     transactionHash:
      '0x14dd66c3e6fd51759714297b8833b50fb8f7a75dd73200fe0dc49cf0b1e4eff8',
     transactionIndex: 0,
     events: { NewEncryptedFile: [Object] } } }
 *
 * @apiError 999:UNKNOW_ERROR 未知错误
 * @apiError 1000:INVAILD_PARAM 参数错误
 * @apiErrorExample {json} 错误示例
 * {err:999,msg:"UNKNOW_ERROR"}
 * {err:1000,msg:"INVAILD_PARAM"}
 */

router.post('/addfilerecord', (req, res, next) => {
    if (!req.body.stablejson ||
        !req.body.sha3file ||
        !req.body.stuSigned ||
        !req.body.edu0Signed ||
        !req.body.edu1Signed ||
        !req.body.eduPrikey ||
        !req.body.fileAddress ||
        !req.body.verificationAddress)
        next(new Error("INVAILD_PARAM"))

    function encrypt(str) {
        var bytes = new Array();
        var len, c;
        len = str.length;
        for (var i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if (c >= 0x010000 && c <= 0x10FFFF) {
                bytes.push(((c >> 18) & 0x07) | 0xF0);
                bytes.push(((c >> 12) & 0x3F) | 0x80);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if (c >= 0x000800 && c <= 0x00FFFF) {
                bytes.push(((c >> 12) & 0x0F) | 0xE0);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if (c >= 0x000080 && c <= 0x0007FF) {
                bytes.push(((c >> 6) & 0x1F) | 0xC0);
                bytes.push((c & 0x3F) | 0x80);
            } else {
                bytes.push(c & 0xFF);
            }
        }
        for (let i = 0; i < bytes.length / 2; i++) {
            let t = bytes[i]
            bytes[i] = bytes[bytes.length - 1 - i]
            bytes[bytes.length - 1 - i] = t
        }
        let buffer = Buffer.from(bytes)
        return "0x" + buffer.toString("hex")
    }
				console.log(req.body.stablejson)
    let encrypted = encrypt(req.body.stablejson)
				console.log("encrypted:" + encrypted)
		console.log("sha3file: " + req.body.sha3file )
  
    contracts.verification.addFile(
            req.body.verificationAddress,
            req.body.eduPrikey,
            req.body.sha3file,
            req.body.stuSigned,
            req.body.edu0Signed,
            req.body.edu1Signed)
        .then(ret => {
						console.log(ret)
						if(!ret.events.NewFile) 
								throw new Error("UNKNOW_ERROR")
            return contracts.file.uploadFile(
                req.body.fileAddress,
                req.body.eduPrikey,
                encrypted
            )
        })
        .then(ret => {
						console.log(ret)
						
						if(!ret.events.NewEncryptedFile)
								throw new Error("UNKNOW_ERROR")
						delete ret.events.NewEncryptedFile.raw
            res.send({
                err: 0,
                msg: ret
            })
        })
        .catch(next)
})


/**
 * @api {post} /contracts/viewfiles  3. ViewFiles
 * @apiVersion 1.0.0
 * @apiGroup Contracts
 * @apiDescription
 * 从区块链获取档案信息，发起者必须有权限查看信息。档案的学生和创建合约的校方地址默认有查看权限。校方可通过 addFileViewers 方法增加某档案的查看权限
 *
 * @apiParam {String} eduPrikey  viewer的私钥，一般为校方prikey
 * @apiParam {String} fileAddress  学生的file合约地址
 * @apiParamExample {json} 请求示例
{ fileAddress: '0xc17491187796DF4d5717DFbB7C1267F2430F6991',
  eduPrikey:
   'cf8959a05ecc0762d1a23355b7c41c0800cadec4672e95a52a328709772c494d' }
 *
 * @apiSuccess {Object} msg 所有档案信息组成的json数组 
 * @apiSuccessExample {json} 返回示例
{ err: 0,
  msg:
   [ '{"address":"北京西二旗","email":"1283912803@qq.com","name":"Jonathan"}' , ...] }
 *
 * @apiError 999:UNKNOW_ERROR 未知错误
 * @apiError 1000:INVAILD_PARAM 参数错误
 * @apiErrorExample {json} 错误示例
 * {err:999,msg:"UNKNOW_ERROR"}
 * {err:1000,msg:"INVAILD_PARAM"}
 */
router.post('/viewfiles', (req, res, next) => {
    if (!req.body.fileAddress || !req.body.eduPrikey)
        next(new Error("INVAILD_PARAM"))
    contracts.file.viewFiles(
            req.body.fileAddress,
            req.body.eduPrikey
        )
        .then(ret => {
            res.send({
                err: 0,
                msg: ret
            })
        })
        .catch(next)
})


module.exports = router
