import mongoose from "mongoose"

export interface IInfluencer {
    _id?: mongoose.Types.ObjectId | String,
    user: mongoose.Types.ObjectId | String; 
    bio: string,
  

}