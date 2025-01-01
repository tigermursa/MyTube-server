import mongoose, { Document, Model } from 'mongoose';
import { IVideo } from './video.interface';
import { title } from 'process';

// Define the Video schema
const videoSchema = new mongoose.Schema<IVideo>(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    versionKey: false, // Disable the "__v" field
  },
);

videoSchema.index({ title: 1 });

// Compile the Video schema into a model
export const Video: Model<IVideo> = mongoose.model<IVideo>(
  'Video',
  videoSchema,
);
