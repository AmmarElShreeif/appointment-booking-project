import prisma from "../config/prismaClient";

export const verifyUser = async (email: string, username: string, photoUrl: string) => {
  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: { username, photoUrl },
      create: { email, username, photoUrl },
    });

    return user;
  } catch (error) {
    console.error("Error verifying user:", error);
    throw new Error("Failed to verify user");
  }
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};
