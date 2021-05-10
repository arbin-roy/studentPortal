const jwtstrategy = require("passport-jwt").Strategy
const extractjwt = require("passport-jwt").ExtractJwt
const Teacher = require("../models/teacher")
const jwtkey = require("./keys").jwtkey

const opts = {
    jwtFromRequest: extractjwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtkey
}

module.exports = passport => {
    passport.use("jwt-teacher", new jwtstrategy(opts, (jwtpayload, done)=>{
        Teacher.findById(jwtpayload.id)
        .then(user=>{
            if(!user){
                return done(null,false)
            }
            return done(null,user)
        }).catch(err=>console.log(err))
    }))
}