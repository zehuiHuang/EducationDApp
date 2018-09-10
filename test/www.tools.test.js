const assert = require("assert")
let api = require("../www/index.js")
let request = require("supertest")(api.app)


let testjson = {
    name: "Jonathan",
    email: "1283912803@qq.com",
    address: "北京西二旗"
}
let teststablejson = ""
let testsha3data = ""

let stu = {}
let edu = {
    wallet: {
        address: "0x65dd104db7d570121e33bcbfde55721cf2b1018f",
        prikey: "ae157ea229549c0d4720bef322d1cf1ee0d8d5be5b4b5372eceffa135438a696"
    }
}
let edu0 = {}
let edu1 = {}

let verificationAddress = ""
let fileAddress = ""

describe('TOOLS', function() {

    this.timeout(1000 * 5 * 60)

    describe("# /tools/newwallet", function() {
        it(`should get new wallet correctly`, function(done) {
            request
                .post('/tools/newwallet')
                .send({})
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err)
                    let result = res.body
                    console.log(result)
                    stu.wallet = result.msg
                    assert(result != null,
                        "expect result to be a wallet")
                    done()
                })
        })
    })
    describe("# /tools/newwallet", function() {
        it(`should get new wallet correctly`, function(done) {
            request
                .post('/tools/newwallet')
                .send({})
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err)
                    let result = res.body
                    console.log(result)
                    edu.wallet = result.msg
                    assert(result != null,
                        "expect result to be a wallet")
                    done()
                })
        })
    })
    describe("# /tools/newwallet", function() {
        it(`should get new wallet correctly`, function(done) {
            request
                .post('/tools/newwallet')
                .send({})
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err)
                    let result = res.body
                    console.log(result)
                    edu0.wallet = result.msg
                    assert(result != null,
                        "expect result to be a wallet")
                    done()
                })
        })
    })
    describe("# /tools/newwallet", function() {
        it(`should get new wallet correctly`, function(done) {
            request
                .post('/tools/newwallet')
                .send({})
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err)
                    let result = res.body
                    console.log(result)
                    edu1.wallet = result.msg
                    assert(result != null,
                        "expect result to be a wallet")
                    done()
                })
        })
    })
    describe("# /tools/tostablejson", function() {
        it(`should convert to stablejson correctly`, function(done) {
            request
                .post('/tools/tostablejson')
                .send({
                    json: JSON.stringify(testjson)
                })
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err)
                    let result = res.body
                    console.log(result)
                    teststablejson = result.msg
                    assert(result.err == 0,
                        "expect to have no err")
                    assert(typeof result.msg == "string",
                        "expect stable json to be a string")
                    done()
                })
        })
    })

    describe("# /tools/tosha3", function() {
        it(`should convert to sha3 correctly`, function(done) {
            request
                .post('/tools/tosha3')
                .send({
                    stablejson: teststablejson
                })
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err)
                    let result = res.body
                    console.log(result)
                    testsha3data = result.msg
                    assert(result.err == 0,
                        "expect to have no err")
                    assert(typeof result.msg == "string",
                        "expect stable json to be a string")
                    done()
                })
        })
    })

    describe("# /tools/rcsign", function() {
        it(`should get signed data correctly`, function(done) {
            request
                .post('/tools/rcsign')
                .send({
                    prikey: stu.wallet.prikey,
                    sha3data: testsha3data
                })
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err)
                    let result = res.body
                    console.log(result)
                    stu.signed = result.msg
                    assert(result.err == 0,
                        "expect to have no err")
                    assert(typeof result.msg == "string",
                        "expect signed data to be a string")
                    done()
                })
        })
    })
    describe("# /tools/rcsign", function() {
        it(`should get signed data correctly`, function(done) {
            request
                .post('/tools/rcsign')
                .send({
                    prikey: edu.wallet.prikey,
                    sha3data: testsha3data
                })
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err)
                    let result = res.body
                    console.log(result)
                    edu.signed = result.msg
                    assert(result.err == 0,
                        "expect to have no err")
                    assert(typeof result.msg == "string",
                        "expect signed data to be a string")
                    done()
                })
        })
    })
    describe("# /tools/rcsign", function() {
        it(`should get signed data correctly`, function(done) {
            request
                .post('/tools/rcsign')
                .send({
                    prikey: edu0.wallet.prikey,
                    sha3data: testsha3data
                })
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err)
                    let result = res.body
                    console.log(result)
                    edu0.signed = result.msg
                    assert(result.err == 0,
                        "expect to have no err")
                    assert(typeof result.msg == "string",
                        "expect signed data to be a string")
                    done()
                })
        })
    })
    describe("# /tools/rcsign", function() {
        it(`should get signed data correctly`, function(done) {
            request
                .post('/tools/rcsign')
                .send({
                    prikey: edu1.wallet.prikey,
                    sha3data: testsha3data
                })
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err)
                    let result = res.body
                    console.log(result)
                    edu1.signed = result.msg
                    assert(result.err == 0,
                        "expect to have no err")
                    assert(typeof result.msg == "string",
                        "expect signed data to be a string")
                    done()
                })
        })
    })

})


describe('CONTRACTS', function() {

    this.timeout(1000 * 5 * 60)

    describe("# /contracts/deployfile", function() {
        it(`should deploy file correctly`, function(done) {
            request
                .post('/contracts/deployfile')
                .send({
                    stuAddress: stu.wallet.address,
                    eduPrikey: edu.wallet.prikey
                })
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err)
                    let result = res.body
                    console.log(result)
                    assert(typeof result.msg.verificationAddress == "string",
                        "expect result0 to be a string")
                    assert(typeof result.msg.fileAddress == "string",
                        "expect result1 to be a string")
                    verificationAddress = result.msg.verificationAddress
                    fileAddress = result.msg.fileAddress
                    done()
                })

        })
    })

    describe("# /contracts/addfilerecord", function() {
        it(`should upload file correctly`, function(done) {
            let req = {
                stablejson: teststablejson,
                sha3file: testsha3data,
                stuSigned: stu.signed,
                edu0Signed: edu0.signed,
                edu1Signed: edu1.signed,
                eduPrikey: edu.wallet.prikey,
                fileAddress: fileAddress,
                verificationAddress: verificationAddress
            }
            console.log("REQUEST:")
            console.log(req)
            request
                .post('/contracts/addfilerecord')
                .send(req)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err)
                    let result = res.body
                    console.log(result)
                    assert(result.err == 0,
                        "expect to have no err")
                    assert(typeof result.msg == "object",
                        "expect msg to be object")
                    done()
                })
        })
    })



    //    describe("# /contracts/addfilerecord", function() {
    //        it(`should upload file correctly`, function(done) {
    //            let req = {
    //                stablejson: teststablejson,
    //                sha3file: testsha3data,
    //                stuSigned: stu.signed,
    //                edu0Signed: edu0.signed,
    //                edu1Signed: edu1.signed,
    //                eduPrikey: edu.wallet.prikey,
    //                fileAddress: fileAddress,
    //                verificationAddress: verificationAddress
    //            }
    //            console.log("REQUEST:")
    //            console.log(req)
    //            request
    //                .post('/contracts/addfilerecord')
    //                .send(req)
    //                .set('Accept', 'application/json')
    //                .expect(200)
    //                .end(function(err, res) {
    //                    if (err) return done(err)
    //                    let result = res.body
    ////                    console.log(result)
    //                    assert(result.err == 0,
    //                        "expect to have no err")
    //                    //assert(typeof result.msg == "string",
    //                    //    "expect stable json to be a string")
    //                    done()
    //                })
    //        })
    //    })

    describe("# /contracts/viewfiles", function() {
        it(`should view files correctly`, function(done) {
            let req = {
                fileAddress: fileAddress,
                eduPrikey: edu.wallet.prikey
            }
            console.log("REQUEST:")
            console.log(req)
            request
                .post('/contracts/viewfiles')
                .send(req)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err)
                    let result = res.body
                    console.log("RESPONSE:")
                    console.log(result)
                    assert(result.err == 0,
                        "expect to have no err")
                    done()
                })
        })
    })

    //describe("# /tools/rcsign", function() {
    //    it(`should get signed data correctly`, function(done) {
    //        request
    //            .post('/tools/rcsign')
    //            .send({
    //                prikey: testwallet.prikey,
    //                sha3data: testsha3data
    //            })
    //            .set('Accept', 'application/json')
    //            .expect(200)
    //            .end(function(err, res) {
    //                if (err) return done(err)
    //                let result = res.body
    //                console.log(result)
    //                assert(result.err == 0,
    //                    "expect to have no err")
    //                assert(typeof result.msg == "string",
    //                    "expect signed data to be a string")
    //                done()
    //            })
    //    })
    //})

})
