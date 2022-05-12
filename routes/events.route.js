const route=require("express").Router();

const services=require("../services/events.services")
    route.post("/insert",services.insertEvent);
    route.post("/get",services.findEvent);
    module.exports=route;