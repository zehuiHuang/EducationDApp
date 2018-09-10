const util = require("ethereumjs-util")


module.exports = str => {
	return util.sha3(str).toString("hex")
}
