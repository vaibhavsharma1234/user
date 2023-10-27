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
exports.influencer_routes = void 0;
// get all influencers
// subscribe or unsubscribe the influencer
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
// influencer jab create h oga tab we get the details 
// user logs in kraga toh user id ilaga and by that we can fetch its data
exports.influencer_routes = express_1.default.Router();
exports.influencer_routes.post('/profile', controller_1.InfluencerProfileController.CreateInfluencerProfile);
exports.influencer_routes.get('/profile', controller_1.InfluencerProfileController.GetInfluencerProfile);
exports.influencer_routes.delete('/profile/:id', controller_1.InfluencerProfileController.DeleteInfluencerProfile);
