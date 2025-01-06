import { Router } from 'express';
import {
  createVideoController,
  getAllVideosController,
  getVideoByIdController,
  deleteVideoController,
  updateVideoController,
  toggleVideoDeleteStatusController,
  getDeletedVideoController,
} from './video.controller';

const router = Router();

// Create a video
router.post('/create-video', createVideoController);

// Get all videos
router.get('/get-all-videos', getAllVideosController);

// Get a single video by ID
router.get('/get-video/:videoId', getVideoByIdController);

// Delete a video by ID
router.delete('/delete-video/:videoId', deleteVideoController);

// Update a video by ID
router.put('/update-video/:videoId', updateVideoController);

// Route to toggle video delete status
router.patch(
  '/video/:videoId/toggle-delete',
  toggleVideoDeleteStatusController,
);
// Route to get deleted videos
router.get('/videos/deleted', getDeletedVideoController);

export default router;
