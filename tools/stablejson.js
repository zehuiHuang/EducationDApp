const stringify = require("fast-json-stable-stringify")

let stablejson = (json) =>{
if(typeof json == "object")
 return stringify(json)
if(typeof json == "string")
 return stringify(JSON.parse(json))
}


module.exports = stablejson


