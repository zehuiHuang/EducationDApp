/**
 * api 设计
 * 1.创建合约
 * 2.
 *
 */


/**
 * @api {post} /v1/newWallet NewWallet
 * @apiVersion 1.0.0
 * @apiName 创建一个新的钱包
 * @apiGroup Tool
 * @apiDescription
 * 每次访问都是一个全新的钱包，需要据数据记录一下
 * 返回的参数全部记录进数据库就行，具体什么时候用到看情况
 * 后面的接口中会提到需要用到以下的哪个参数
 * 可以给整个系统生成一个固定的钱包，还可以给每个学生生成一个单独的钱包
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
 */



/**
 * @api {post} /v1/tostablejson ToStableJSON
 * @apiVersion 1.0.0
 * @apiName 获取稳定JSON
 * @apiGroup Tool
 * @apiDescription
 * 需要上链的json比如通过这个接口转化一下，因为json键值的排序会导致计算的hash值不同
 * 后面的接口会提到什么时候需要这个stablejson
 *
 * @apiParam {String} json 普通的json字符串
 * @apiParamExample {json} 请求示例
 * {
 *	"json":"{'b':123,'a',345}"
 * }
 *
 * @apiSuccess {String} stabejson 经过字典排序后的stablejson
 * @apiSuccessExample {json} 返回示例
 * {
 *	"err":0,
 *	"msg":{
 *	  "stablejson": "{'b':123,'a',345}"
 *	}
 * }
 */


/**
 * @api {post} /v1/tosha3 ToSha3
 * @apiVersion 1.0.0
 * @apiName 获取数据的sha3值
 * @apiGroup Tool
 * @apiDescription
 * 一搬是把stablejson在这里转换成sha3值
 *
 * @apiParam {String} stablejson  需要转换的stablejson
 * @apiParamExample {json} 请求示例
 * {
 *	"stablejson":"{'a':123,'b':445}"
 * }
 *
 * @apiSuccess {String} sha3 转换后的hash值字符串
 * @apiSuccessExample {json} 返回示例
 * {
 *	"err":0,
 *	"msg":{
 *		"sha3": "1231892318923..."
 *	}
 * }
 */



/**
 * @api {post} /v1/signrsa signRSA
 * @apiVersion 1.0.0
 * @apiName 椭圆曲线签名
 * @apiGroup Request
 * @apiDescription 
 * 后面接口中会提到这个什么时候用，这个方法单独分开是为了以后完全去中心化作准备
 * 
 * @apiParam {String} prikey 需要签名的私钥 
 * @apiParam {String} sha3string   需要签名sha3string数据
 * @apiParamExample {json} 请求示例
 * {
 *	"prikey": "1928390123...",
 *  "stablejson": "'{.....}'"	
 * }
 *
 * @apiSuccess {String} 签名结果，是一个json字符串,直接记录这个字符串就行，不要将其转化成数组或者对象
 * @apiSuccessExample {json} 返回示例
 * {
 *   "err": "0",
 *   "msg":"{'v': '18','r': '0x1234567...','s': '0x12312312'}"
 * }
 *
 * @apiError 999:UNKNOW_ERROR 未知错误
 * @apiErrorExample {json} 错误示例
 * {err:999,msg:"UNKNOW_ERROR"}
 */



/**
 * @api {post} /v1/deployfile deployFile
 * @apiVersion 1.0.0
 * @apiName 创建新的智能档案
 * @apiGroup Functional
 * @apiDescription 
 * 用学生提供的地址创建新的智能档案，本系统会以学校的身份为其签名
 * 校方系统需要记录学生的两个档案地址
 *
 * @apiParam {String} stuAddress 学生提交的地址,该参数会由客户端提供
 * @apiParamExample {json} 请求示例
 * {
 *	'stuAddress': '0x1928390123...'
 * }
 *
 * @apiSuccess {String} fileAddress 档案合约的地址
 * @apiSuccess {String} verificationAddress 验证合约的地址
 * @apiSuccessExample {json} 返回示例
 * {
 *   err:0,
 *   msg:{
 *  	  'fileAddress': '0x1234567...',
 *  	  'verificationAddress': '0x1234567...'
 *   }
 * }
 *
 * @apiError 999:UNKNOW_ERROR 未知错误
 * @apiErrorExample {json} 错误示例
 * {err:999,msg:"UNKNOW_ERROR"}
 */


/**
 * @api {post} /v1/addfilerecord addFileRecord
 * @apiVersion 1.0.0
 * @apiName 为智能档案增加内容
 * @apiGroup Functional
 * @apiDescription 
 * 多重签名上链学生成绩或者其他信息
 * 
 * @apiParam {String} stablejson 需要上链数据的stablejson
 * @apiParam {String} sha3file 上面那个stablejson经过sha3加密后的文件
 * @apiParam {String} stuSigned 学生账号签名的上述sha3file的椭圆曲线加密字符串
 * @apiParam {String} eduSigned 校方账号签名的上述sha3file的椭圆曲线加密字符串
 * @apiParam {String} eduPrikey 校方账号的私钥
 * @apiParamExample {json} 请求示例
 * {
 *	'stablejson': '...',
 *	'sha3file' : ''
 * }
 *
 * @apiSuccess {String} fileAddress 档案合约的地址
 * @apiSuccess {String} verificationAddress 验证合约的地址
 * @apiSuccessExample {json} 返回示例
 * {
 *   err:0,
 *   msg:{
 *  	  'fileAddress': '0x1234567...',
 *  	  'verificationAddress': '0x1234567...'
 *   }
 * }
 *
 * @apiError 999:UNKNOW_ERROR 未知错误
 * @apiErrorExample {json} 错误示例
 * {err:999,msg:"UNKNOW_ERROR"}
 */



/**
 * @api {post} /v1/viewfiles  viewFiles
 * @apiVersion 1.0.0
 * @apiName 查看智能档案信息
 * @apiGroup Functional
 * @apiDescription
 * 从区块链获取档案信息，发起者必须有权限查看信息
 * 档案的学生和创建合约的校方地址默认有查看权限
 * 校方可通过 addFileViewers 方法增加某档案的查看权限
 *
 * @apiParam {String} prikey   
 *    viewer的私钥，一般为校方prikey,或者学生地址
 * @apiParam {String} fileAddress 
 *    学生的智能档案地址
 * @apiParamExample {json} 请求示例
 * {
 *	'prikey': '1237489342814...
 *	'fileAddress': '0x818283823812'
 * }
 *
 * @apiSuccess {Object} 所有档案信息组成的json数组 
 * @apiSuccessExample {json} 返回示例
 * {
 *	'err':0,
 *	'msg':[{'a':123,'b',456},{'a':123,b:'123132'}]
 * }
 *
 *
 *
 */















