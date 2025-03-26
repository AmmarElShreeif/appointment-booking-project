import { Request, Response } from "express";
import {
  createAppointment,
  deleteAppointment,
  updateAppointmentsStatus,
} from "../services/appointment.service";
import prisma from "../config/prismaClient";

export const bookAppointment = async (req: Request, res: Response) => {
  try {
    const { email, username, photoUrl, date } = req.body;

    if (!email || !username || !photoUrl || !date) {
      res.status(400).json({ error: "Missing required fields" });
    }

    const appointment = await createAppointment({ email, username, photoUrl, date });

    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeAppointment = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.params;

    if (!appointmentId) {
      res.status(400).json({ error: "Appointment ID is required" });
    }

    await deleteAppointment(appointmentId);
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    if (!email) {
      res.status(400).json({ error: "Email is required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const appointments = await prisma.appointment.findMany({
      where: { userId: user?.id },
      include: { user: true },
    });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const refreshAppointmentsStatus = async (_req: Request, res: Response) => {
  try {
    await updateAppointmentsStatus();
    res.status(200).json({ message: "Appointments updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
