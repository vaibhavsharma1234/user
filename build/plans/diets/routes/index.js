"use strict";
// 
// craetion of influencer profile 
// update influencer profile 
// delete influencer profile
// get influencer profile 
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diet_routes = void 0;
// get all influencers
// subscribe or unsubscribe the influencer
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
// influencer jab create h oga tab we get the details 
// user logs in kraga toh user id ilaga and by that we can fetch its data
exports.diet_routes = express_1.default.Router();
exports.diet_routes.post('/create', controller_1.DietPlanController.CreateDietPlan);
exports.diet_routes.put('/:dietPlanId', controller_1.DietPlanController.UpdateDietPlan);
exports.diet_routes.get('/ByInfluencer/:influencerId', controller_1.DietPlanController.GetAllDietPlanByInfluencer);
exports.diet_routes.delete('/:dietPlanId', controller_1.DietPlanController.DeleteDietPlan);
