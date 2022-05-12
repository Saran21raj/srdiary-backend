const route=require("express").Router();

const services=require("../services/user.services")
    route.post("/login",services.login);
    route.post("/register",services.register);
    module.exports=route;