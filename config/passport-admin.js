const jwtstrategy = require("passport-jwt").Strategy
const extractjwt = require("passport-jwt").ExtractJwt
const Admin = require("../models/admin")
const jwtkey = require("./keys").jwtkey

const opts = {
    jwtFromRequest: extractjwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtkey
}

module.exports = passport => {
    passport.use("jwt-admin", new jwtstrategy(opts, (jwtpayload, done)=>{
        Admin.findById(jwtpayload.id)
        .then(user=>{
            if(!user){
                return done(null,false)
            }
            return done(null,user)
        }).catch(err=>console.log(err))
    }))
}