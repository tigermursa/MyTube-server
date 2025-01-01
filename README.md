

## API Endpoints

### 1. **Create Video**
**POST** `/create-video`  
Creates a new video.

### 2. **Get All Videos**
**GET** `/get-all-videos`  
Fetches all non-deleted videos.

### 3. **Get Video by ID**
**GET** `/get-video/:id`  
Fetches a video by its ID.

### 4. **Update Video**
**PUT** `/update-video/:id`  
Updates a video's details.

### 5. **Delete Video (Soft Delete)**
**PATCH** `/video/:id/toggle-delete`  
Marks a video as deleted.

### 6. **Get Deleted Videos**
**GET** `/videos/deleted`  
Fetches all deleted videos.



