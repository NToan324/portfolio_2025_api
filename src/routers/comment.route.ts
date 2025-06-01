import { Router } from "express";
import commentController from "../controllers/comment.controller";
import asyncHandler from "../middleware/asyncHandler";
import authMiddleware from "../middleware/auth";
const router = Router();

router.get("/", asyncHandler(commentController.getComments));
router.post("/", asyncHandler(commentController.addComment));
// router.delete(
//   "/",
//   authMiddleware,
//   asyncHandler(commentController.deleteComments)
// );
router.delete(
  "/:id",
  authMiddleware,
  asyncHandler(commentController.deleteCommentById)
);

export default router;
