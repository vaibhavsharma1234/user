import express from "express";

import { LoginRegisterController } from "../controller/index";


export const auth_routes = express.Router();



auth_routes.post("/register", LoginRegisterController.Register);