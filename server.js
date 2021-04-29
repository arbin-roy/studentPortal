const express = require("express");
const app = express();
const port = process.env.PORT || 5678;
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => {console.log("MongoDB Connected")}).catch(err => {
    console.log(err)
})

app.get('/', (req, res) => {
    res.send("Hey there!")
})

app.use('/student', require("./routes/student"));

app.use((req, res, next) => {
    return res.status(404).json({
        "error": "Cannot " + req.method + " " + req.url,
        "message": "Requested page not found"
    })
})

app.use((error, req, res, next) => {
    console.log(error)
    return res.json({"success": false, "errors": error.toString()})
})

app.listen(port, () => {console.log(`Server is running in port: ${port}`)});