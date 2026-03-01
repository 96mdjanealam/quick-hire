import express from "express";
const router = express.Router();
import {
  submitApplication,
  deleteApplication,
  getApplications,
} from "../controllers/applicationController.js";
import { validateApplication } from "../middleware/validation.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, admin, getApplications)
  .post(validateApplication, submitApplication);

router.route("/:id").delete(protect, admin, deleteApplication);

export default router;
