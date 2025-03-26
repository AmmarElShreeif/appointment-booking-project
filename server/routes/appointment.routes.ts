import express from "express";
import {
  bookAppointment,
  getAppointments,
  refreshAppointmentsStatus,
  removeAppointment,
} from "../controllers/appointment.controller";

const router = express.Router();

router.post("/book", bookAppointment);
router.delete("/delete/:appointmentId", removeAppointment);
router.get("/user/:email", getAppointments);
router.patch("/refresh-status", refreshAppointmentsStatus);

export default router;
