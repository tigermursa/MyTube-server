import { NextFunction, Request, Response } from 'express';
import {
  createVideo,
  deleteVideo,
  getAllVideos,
  getDeletedVideos,
  getVideoById,
  toggleVideoDeleteStatus,
  updateVideo,
} from './video.service';
import { createVideoSchema } from './video.zodvalidation';
import { z } from 'zod';

// Create a video with Zod validation
export const createVideoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    // Validate incoming data using Zod
    const validatedData = createVideoSchema.parse(req.body);

    // If validation passes, call the service to create the video
    const video = await createVideo(validatedData);

    res.status(201).json({
      success: true,
      message: 'Video created successfully',
      data: video,
    });
  } catch (error: any) {
    // If validation fails, send an error response with the validation error messages
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
    }
    next(error); // Pass other errors to the error handler
  }
};

export const getAllVideosController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const videos = await getAllVideos();

    if (!videos.length) {
      return res.status(200).json({
        success: true,
        message: 'No videos found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Videos fetched successfully',
      total: videos.length,
      data: videos,
    });
  } catch (error: any) {
    next(error); // Pass errors to Express error handler
  }
};

export const getVideoByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { videoId } = req.params;
    const video = await getVideoById(videoId);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Video fetched successfully',
      data: video,
    });
  } catch (error) {
    next(error); // Pass error to the handler
  }
};

export const deleteVideoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { videoId } = req.params;
    const video = await deleteVideo(videoId);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Video deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateVideoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { videoId } = req.params;
    const updatedVideo = await updateVideo(videoId, req.body);

    if (!updatedVideo) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Video updated successfully',
      data: updatedVideo,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleVideoDeleteStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { uid } = req.params;
    const user = await toggleVideoDeleteStatus(uid);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: `User ${user.isDeleted ? 'marked as deleted' : 'restored'}`,
    });
  } catch (error) {
    next(error);
  }
};

// New controller to fetch deleted users
export const getDeletedVideoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const deletedUsers = await getDeletedVideos();

    res.status(200).json({
      success: true,
      data: deletedUsers,
    });
  } catch (error) {
    next(error);
  }
};
