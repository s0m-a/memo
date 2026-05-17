import express from 'express';
import ImageController from '../controllers/imageController.js';
import authenticateJWT from '../middleware/authMiddleware.js';

import { upload } from '../config/cloudinary.js';
const router = express.Router();

router.post(
  "/pre-upload",
  authenticateJWT,
  (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error("Multer/Cloudinary Error:", err);
        return res.status(400).json({
          status: "error",
          message: err.message || "Failed to upload image to Cloudinary",
        });
      }
      next();
    });
  },
  ImageController.preUpload
);

router.post("/save", authenticateJWT, ImageController.saveImage);
router.post("/analyze", authenticateJWT, ImageController.analyzeImage);
router.get('/retrieve', authenticateJWT, ImageController.retrieve);
router.put('/:id', authenticateJWT, ImageController.updateImage);
router.delete('/:id', authenticateJWT, ImageController.deleteImage);

export default router;
