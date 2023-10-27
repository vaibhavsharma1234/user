// 
// craetion of influencer profile 
// update influencer profile 
// delete influencer profile
// get influencer profile 

// get all influencers
// subscribe or unsubscribe the influencer

import express from "express";
import { InfluencerProfileController } from "../controller";
// influencer jab create h oga tab we get the details 
// user logs in kraga toh user id ilaga and by that we can fetch its data

export const influencer_routes = express.Router();
influencer_routes.post('/profile',InfluencerProfileController.CreateInfluencerProfile)
influencer_routes.get('/profile',InfluencerProfileController.GetInfluencerProfile)
influencer_routes.delete('/profile/:id',InfluencerProfileController.DeleteInfluencerProfile)



