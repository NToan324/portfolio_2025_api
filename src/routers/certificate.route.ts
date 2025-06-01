import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler";
import certificateController from "../controllers/certificate.controller";
import authMiddleware from "../middleware/auth";
const router = Router();

router.get("/", asyncHandler(certificateController.getCertificates));
router.post("/", asyncHandler(certificateController.createCertificate));
router.delete(
  "/:id",
  authMiddleware,
  asyncHandler(certificateController.deleteCertificateById)
);

export default router;
