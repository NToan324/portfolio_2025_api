import { Router } from "express";
import projectController from "../controllers/project.controller";
import asyncHandler from "../middleware/asyncHandler";
import authMiddleware from "../middleware/auth";
const router = Router();

router.post("/", asyncHandler(projectController.addProject));
router.patch(
  "/:id",
  authMiddleware,
  asyncHandler(projectController.updateProjectById)
);
router.get("/", asyncHandler(projectController.getProjects));
router.get("/:id", asyncHandler(projectController.getProject));
router.delete(
  "/:id",
  authMiddleware,
  asyncHandler(projectController.deleteProject)
);

export default router;
