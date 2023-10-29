// 
// craetion of influencer profile 
// update influencer profile 
// delete influencer profile
// get influencer profile 

// get all influencers
// subscribe or unsubscribe the influencer

import express from "express";
import { DietPlanController } from "../controller";
// influencer jab create h oga tab we get the details 
// user logs in kraga toh user id ilaga and by that we can fetch its data

export const diet_routes = express.Router();
diet_routes.post('/create',DietPlanController.CreateDietPlan)
diet_routes.put('/:dietPlanId',DietPlanController.UpdateDietPlan)
diet_routes.get('/ByInfluencer/:influencerId',DietPlanController.GetAllDietPlanByInfluencer)
diet_routes.delete('/:dietPlanId',DietPlanController.DeleteDietPlan)




