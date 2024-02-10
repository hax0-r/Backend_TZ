const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const userModel = require("./Model/userSchema");
const middlewares = require("./MiddleWares/AuthMiddlwWares");
const SECRET_KEY = require("./globle");
const PORT = 5
const app = express();
const BASE_URL = `mongodb+srv://talha185133:StCKt4Fi5qk4T8h5@cluster0.nvzkt0f.mongodb.net/SIGN_UP`
mongoose.connect(BASE_URL)

    .then((res) => console.log("Mongoose Connected"))
    .catch((err) => console.log("Mongoose Not Connected"))

app.use(cors());
app.use(express.json())

// app.use("/", AuthMiddleWares)
app.get('/api/check', (req, res) => {
    res.send("All Good");
})
app.get('/api/addToCart', middlewares.AUTH_MIDDLEWARES, (req, res) => {
    res.send("i am eligible");
})

// ================AUTHENTICATION SIGN UP===========

app.post("/api/signup", (req, res) => {
    const { name, email, password, phone } = req.body
    if (!name || !email || !password || !phone) {
        res.json({
            Message: "Required fields are missing "
        })
        return
    }

    userModel.findOne({ email })
        .then((user) => {
            if (user) {
                res.json({
                    Message: "Email already use"
                })
            } else {
                let objToSend = {
                    name, email, password, phone
                }

                userModel.create(objToSend)
                    .then((response) => {
                        console.log("response ", response);
                        res.json({
                            status: true,
                            message: `${response.name} welcome, you have register`,
                        })
                    })
                    .catch((err) => {
                        res.json({
                            status: false,
                            message: "Internal Sserver Error",
                        })
                    })
            }
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);
    if (!email || !password) {
        res.json({
            Message: "Required fields are missing "
        })
        return
    }

    userModel.findOne({ email })
        .then((user) => {
            if (!user) {
                res.json({
                    Message: "Email not Found"
                })
            } else {
                let ispassword = user.password
                if (!ispassword) {
                    res.json({
                        Mesasge: "Incorrect Password"
                    })
                } else {
                    const tokenobj = {
                        ...user
                    }
                    const token = jwt.sign(tokenobj, SECRET_KEY)
                    console.log(token);
                    res.json({
                        Mesasge: `${user.name} login successfully`,
                        token: token
                    })
                }
            }
        })
        .catch((err) => {
            console.log(err);
        })



})

app.listen(PORT, () => console.log(`Your server is running on a localhost ${PORT}`))