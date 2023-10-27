import mongoose, { Schema } from "mongoose";
import { IInfluencer } from "../interfaces/influencer/influencer.interface"; 

export const influencerSchema = new Schema<IInfluencer>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      required: true,
    },
  
  },
  {
    timestamps: true
  }
);
