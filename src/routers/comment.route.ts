import { Router } from "express";
import commentController from "../controllers/comment.controller";
import asyncHandler from "../middleware/asyncHandler";
import authMiddleware from "../middleware/auth";
import { antiSpamByIp } from "../middleware/antiSpamByIp";
const router = Router();

router.get("/", asyncHandler(commentController.getComments));
router.post("/", antiSpamByIp, asyncHandler(commentController.addComment));
// router.delete(
//   "/",
//   authMiddleware,
//   asyncHandler(commentController.deleteComments)
// );
router.delete(
  "/:id",
  authMiddleware,
  asyncHandler(commentController.deleteCommentById),
);

export default router;
