import express from "express";

import { LoginRegisterController } from "../controller/index";


export const auth_routes = express.Router();



auth_routes.post("/register", LoginRegisterController.Register);
auth_routes.get('/register',(req,res)=>{
    res.send("vaibhav")
})
auth_routes.post("/login",LoginRegisterController.Login)
