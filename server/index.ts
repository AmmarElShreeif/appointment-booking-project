import express from "express";
import cors from "cors";
import cron from "node-cron";
import prisma from "./config/prismaClient";
import authRoutes from "./routes/auth.routes";
import appointmentRoutes from "./routes/appointment.routes";
import { updateAppointmentsStatus } from "./services/appointment.service";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes passworddW1!@swe
app.get("/", (req, res) => {
  res.send("Medical Booking App Backend");
});

app.use("/api", authRoutes);
app.use("/api/appointments", appointmentRoutes);

// Start server
const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully!");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to database:", error);
    process.exit(1);
  }
};

startServer();
