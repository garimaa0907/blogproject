const authorModel = require("../models/authorModel")
const jwt=require('jsonwebtoken')
const blogModel = require("../models/blogModel")

const authenticate=function(req,res,next){
    try{
        const header=req.headers["x-api-key"]
        if(!header) return res.status(404).send({status:false,message:"Required Token Not Found"})
        const verify=jwt.verify(header,"pass123")
        if(verify){
            req.verify=verify
            next()
        }
        else return res.status(401).send("Not Authenticated")
    }
    catch(err){
        res.status(500).send(err.message)
    }
}
module.exports.authenticate=authenticate
