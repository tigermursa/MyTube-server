import { IVideo } from './video.interface';
import { Video } from './video.model';
import { CreateVideoInput } from './video.zodvalidation';

// Create a new video

export const createVideo = async (
  videoData: CreateVideoInput, // Use the Zod validated type here
): Promise<IVideo> => {
  try {
    const video = new Video(videoData);
    return await video.save();
  } catch (error: any) {
    throw error; // Re-throw any errors (e.g., database errors)
  }
};

// Get all videos
export const getAllVideos = async (): Promise<IVideo[]> => {
  return await Video.find({ isDeleted: false });
};

export const getVideoById = async (videoId: string): Promise<IVideo | null> => {
  return await Video.findById(videoId);
};

export const deleteVideo = async (videoId: string): Promise<IVideo | null> => {
  return await Video.findByIdAndDelete(videoId);
};

export const updateVideo = async (
  videoId: string,
  updateData: Partial<IVideo>,
): Promise<IVideo | null> => {
  return await Video.findByIdAndUpdate(videoId, updateData, {
    new: true,
    runValidators: true,
  });
};

export const toggleVideoDeleteStatus = async (videoId: string) => {
  // Find the video by ID
  const video = await Video.findById(videoId);

  if (!video) {
    throw new Error('Video not found');
  }

  // Toggle the `isDeleted` status and save
  video.isDeleted = !video.isDeleted;
  await video.save();

  return video;
};

export const getDeletedVideos = async (): Promise<IVideo[]> => {
  // Fetch all videos with isDeleted = true
  return await Video.find({ isDeleted: true });
};
