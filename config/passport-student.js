const jwtstrategy = require("passport-jwt").Strategy
const extractjwt = require("passport-jwt").ExtractJwt
const Student = require("../models/students")
const jwtkey = require("./keys").jwtkey

const opts = {
    jwtFromRequest: extractjwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtkey
}

module.exports = passport => {
    passport.use("jwt-student", new jwtstrategy(opts, (jwtpayload, done) => {
        Student.findById(jwtpayload.id)
        .then(student=>{
            if(!student){
                return done(null, false)
            }
            return done(null, student)
        }).catch(err => console.log(err))
    }))
}