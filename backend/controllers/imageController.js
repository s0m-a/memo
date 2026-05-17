import User from '../models/userModel.js'
import Image from '../models/imageModel.js'
import { analyzeImageFromUrl } from '../utils/gemini.js';

class ImageController {
  static async preUpload(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          status: "error",
          message: "No image file uploaded",
        });
      }

      return res.status(200).json({
        status: "success",
        image_url: req.file.path,
      });
    } catch (error) {
      console.error("Error in preUpload:", error);
      return res.status(500).json({ status: "error", message: "Upload failed" });
    }
  }

  static async analyzeImage(req, res) {
    const { image_url } = req.body;
    try {
      if (!image_url) {
        return res.status(400).json({
          status: "error",
          message: "Image URL is required for analysis",
        });
      }

      const analysis = await analyzeImageFromUrl(image_url);
      return res.status(200).json({
        status: "success",
        ...analysis,
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      return res.status(500).json({
        status: "error",
        message: "Failed to analyze image",
      });
    }
  }

  static async saveImage(req, res) {
    const userId = req.user.id;
    const { title, description, image_url } = req.body;
    try {
      if (!image_url) {
        return res.status(400).json({
          status: "error",
          message: "Image URL is required",
        });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ status: "error", message: "User not found" });
      }

      const createData = { 
        UserId: userId, 
        image_url, 
        title: title || "Untitled Memory", 
        description: description || "No description provided." 
      };
      const image = await Image.create(createData);
      return res.status(201).json({ status: "success", message: `Image saved`, id: image._id });
    } catch (error) {
      console.error("Error saving image:", error);
      return res.status(500).json({ status: "error", message: "Failed to save image" });
    }
  }

  static async retrieve(req, res) {
    const userId = req.user.id;
    try {
      const images = await Image.find({ UserId: userId });
      if (!images || images.length === 0) {
        return res
          .status(400)
          .json({ status: "error", message: "No images found for this user" });
      }

      return res
        .status(200)
        .json({ status: "success", message: `Images retrieved`, images });
    } catch (error) {
      console.error("Error retrieving images:", error);
      return res
        .status(500)
        .json({ status: "error", message: "Failed to get images" });
    }
  }

  static async updateImage(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, description } = req.body;
    try {
      const image = await Image.findOneAndUpdate(
        { _id: id, UserId: userId },
        { title, description },
        { new: true }
      );
      if (!image) {
        return res.status(404).json({ status: "error", message: "Image not found or unauthorized" });
      }
      return res.status(200).json({ status: "success", message: "Image updated", image });
    } catch (error) {
      console.error("Error updating image:", error);
      return res.status(500).json({ status: "error", message: "Failed to update image" });
    }
  }

  static async deleteImage(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    try {
      const image = await Image.findOneAndDelete({ _id: id, UserId: userId });
      if (!image) {
        return res.status(404).json({ status: "error", message: "Image not found or unauthorized" });
      }
      return res.status(200).json({ status: "success", message: "Image deleted" });
    } catch (error) {
      console.error("Error deleting image:", error);
      return res.status(500).json({ status: "error", message: "Failed to delete image" });
    }
  }
}

export default ImageController;