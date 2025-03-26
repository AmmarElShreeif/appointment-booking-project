import prisma from "../config/prismaClient";
import { verifyUser } from "./auth.service";

interface CreateAppointmentInput {
  email: string;
  username: string;
  photoUrl: string;
  date: Date;
}

export const createAppointment = async (data: CreateAppointmentInput) => {
  const user = await verifyUser(data.email, data.username, data.photoUrl);

  return await prisma.appointment.create({
    data: {
      userId: user.id,
      date: data.date,
    },
  });
};

export const deleteAppointment = async (appointmentId: string) => {
  const existingAppointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  });

  if (!existingAppointment) {
    throw new Error("Appointment not found");
  }

  return await prisma.appointment.delete({
    where: { id: appointmentId },
  });
};

export const getAppointments = async (userId: string) => {
  return await prisma.appointment.findMany({
    where: { userId },
    include: { user: true },
  });
};

export const updateAppointmentsStatus = async () => {
  const now = new Date();
  return await prisma.appointment.updateMany({
    where: { date: { lt: now }, status: "available" },
    data: { status: "unavailable" },
  });
};
