const userModel = require("../Model/userSchema");
const SECRET_KEY = require("../globle");
const jwt = require("jsonwebtoken");

const controllers = {
    check: (req, res) => {
        res.send("All Good");
    },

    signup: (req, res) => {
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
    },

    login: (req, res) => {
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



    },

    addToCart: (req, res) => {
        res.send("i am eligible");
    }
}

module.exports = controllers