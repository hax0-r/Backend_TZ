const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../globle");

const middlewares = {
    AUTH_MIDDLEWARES: (req, res, next) => {
        try {
            const isUser = req.headers.authorization.split(" ")[1];
            const isUserLogin = jwt.verify(isUser, SECRET_KEY)
            if (isUserLogin._doc) {
                next()
            }
        } catch (error) {
            res.send("Please login to continue");
        }
    }
}

module.exports = middlewares 