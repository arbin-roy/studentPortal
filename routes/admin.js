const router = require("express").Router()
const jwt = require("jsonwebtoken");
const jwtKey = require("../config/keys").jwtkey;
const passport = require("passport")

const Admin = require("../models/admin")

router.post('/login', (req, res, next) => {
    Admin.findOne({adminid: req.body.roll, password: req.body.password})
    .then(admin => {
        if(!admin){
            return res.status(404).json({
                "success": false,
                "errors": "No admin found"
            })
        }
        const payload = {
            name: admin.name,
            id: admin.id
        }
        jwt.sign(payload, jwtKey, {expiresIn:60*60*3}, (err, token) => {
            if (err) return next;
            return res.status(200).json({
                "success": true,
                "data": admin,
                "token": "Bearer " + token
            })
        })
    }).catch(next)
})

module.exports=router