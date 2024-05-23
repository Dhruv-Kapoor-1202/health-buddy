import { Router } from "express";
import {
  signUp,
  signIn,
  // authController,
  applyDoctorController,
  getAllDoctors,
  bookAppointment,
  userAppointments,
} from "../controllers/auth.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

// router.post("/getUserData", authController);

router.post("/applyDoctor", applyDoctorController);

router.get("/getAllDoctors", getAllDoctors);

router.post("/bookAppointment", bookAppointment);

router.post("/userAppointments", userAppointments);

export default router;
