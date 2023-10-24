import mongoose from "mongoose";
import { IUser } from "../interfaces/auth/user.interface";

import { userSchema } from "../schemas/user.schema";


export const createAuthDBModels = (authDBModel: mongoose.Connection) => {
    let User: mongoose.Model<IUser> = authDBModel.model('User', userSchema);
   
  
    return {
      User,
      
    }
  }