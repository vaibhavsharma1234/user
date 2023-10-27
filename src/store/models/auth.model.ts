import mongoose from "mongoose";
import { IUser } from "../interfaces/auth/user.interface";

import { userSchema } from "../schemas/user.schema";
import { IInfluencer } from "../interfaces/influencer/influencer.interface";
import { influencerSchema } from "../schemas/infuencer.schema";


export const createAuthDBModels = (authDBModel: mongoose.Connection) => {
    let User: mongoose.Model<IUser> = authDBModel.model('User', userSchema);
    let Influencer:mongoose.Model<IInfluencer>=authDBModel.model('Influencer', influencerSchema);
   
  
    return {
      User,
      Influencer
      
    }
  }