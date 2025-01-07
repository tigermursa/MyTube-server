import mongoose, { Document, Model } from 'mongoose';
import { IUser } from './user.interface';

// Define the User schema
const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Simple email regex
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    versionKey: false, // Disable the "__v" field
  },
);

// Compile the schema into a model
export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
