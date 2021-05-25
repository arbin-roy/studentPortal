const express = require("express");
const app = express();
const port = process.env.PORT || 5678;
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const path = require("path")
const passport = require("passport")
const bodyparser = require("body-parser")
const cors = require('cors')

app.use("/uploads", express.static(path.join(__dirname, './uploads')));

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => {console.log("MongoDB Connected")}).catch(err => {
    console.log(err)
})

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT,POST,DELETE"
}

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(cors(corsOptions));

passport.initialize()
require("./config/passport-teacher")(passport)

app.get('/', (req, res) => {
    res.send("Hey there!")
})

app.use('/student', require("./routes/student"));
app.use('/teacher', require("./routes/teacher"));

app.use((req, res, next) => {
    return res.status(404).json({
        "error": "Cannot " + req.method + " " + req.url,
        "message": "Requested page not found"
    })
})

app.use((error, req, res, next) => {
    console.log(error)
    return res.status(500).json({"success": false, "errors": error.toString()})
})

app.listen(port, () => {console.log(`Server is running in port: ${port}`)});