const express = require("express");
const bodyParser = require('body-parser')
const dotenv = require("dotenv")

const userRouter = require('./routes/user');

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use("/user", userRouter);

app.use('/', (req, res) => {
    res.send("Server root")
})

app.listen(8000, () => {
    console.log("Paytm server is running on port 8000")
})