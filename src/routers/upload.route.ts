import { Router } from "express";
import uploadController from "../controllers/upload.controller";
import asyncHandler from "../middleware/asyncHandler";
import uploadMulter from "../config/upload";
const router = Router();

router.post("/", asyncHandler(uploadController.uploadImage));
router.post(
  "/file",
  uploadMulter.single("file"),
  asyncHandler(uploadController.uploadFile)
);

export default router;
