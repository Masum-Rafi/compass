import { Router } from "express";
import { listDestinations, createDestination } from "../controllers/destinationController.js";
const router = Router();

router.get("/", listDestinations);
router.post("/", createDestination);

export default router;
