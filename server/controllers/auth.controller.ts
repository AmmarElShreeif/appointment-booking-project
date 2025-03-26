import { Request, Response } from "express";
import { verifyUser } from "../services/auth.service";

export const CreateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, username, photoUrl } = req.body;

    if (!email || !username || !photoUrl) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const user = await verifyUser(email, username, photoUrl);

    res.status(200).json({ message: "User created successfully", user });
  } catch (error: any) {
    console.error("Error in CreateUser:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
