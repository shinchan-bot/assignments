const express = require("express");
const bodyParser = require('body-parser')
const dotenv = require("dotenv")
const cors = require('cors')

const userRouter = require('./routes/user');
const accountRouter = require('./routes/account');

dotenv.config();

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/account", accountRouter);

app.use('/', (req, res) => {
    res.send("Server root")
})

app.listen(8000, () => {
    console.log("Paytm server is running on port 8000")
})