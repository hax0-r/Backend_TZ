const express = require("express");
const middlewares = require("../MiddleWares/AuthMiddlwWares");
const controllers = require("../Controllers/Controllers");
const route = express.Router();


// check
route.get('/check', controllers.check)


// ================AUTHENTICATION SIGN UP===========

route.post("/api/signup", controllers.signup)

route.post("/api/login", controllers.login)


// Private
route.get('/api/addToCart', middlewares.AUTH_MIDDLEWARES, controllers.addToCart)

module.exports = route