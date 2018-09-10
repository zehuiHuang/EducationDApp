const bodyParser = require("body-parser")
const express = require("express")
let app = express()
let tools = require("./tools")
let contracts = require("./functional")

//设置跨与访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.use(bodyParser.json())

app.use('/tools', tools)
app.use('/contracts', contracts)

app.use( (err, req, res, next)=>{
  switch(err.message) {
//    case "INVAILD_ALIAS":{
//      res.status(421).send({errcode:421,errmsg:err.message})
//      break
//    }
//    case "INVAILD_ADDRESS":{
//      res.status(422).send({errcode:422,errmsg:err.message})
//      break
//    }
//    case "INVAILED_AMOUNT":{
//      res.status(423).send({errcode:423,errmsg:err.message})
//      break
//    }
//    case "SEND_TOO_OFTEN":{
//        res.status(424).send({errcode:424,errmsg:err.message})
//        break
//    }
    case "INVAILD_PARAM":{
        res.status(200).send({errcode:1000,errmsg:err.message})
        break
    }
    default:{
      console.error(err)
      res.status(200).send({errcode:999,errmsg:"UNKNOW_ERROR"})
      break
    }
  }
})


app.listen(10010)
console.log("EducationDApp listening on" + 10010)


exports.app = app
