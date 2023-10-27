import express from "express";
import { UserProfileController } from "../controller";
export const user_profile_routes =express.Router()


user_profile_routes.get("/profile",UserProfileController.GetUserDetails)
user_profile_routes.put("/profile",UserProfileController.UpdateUserDetails)