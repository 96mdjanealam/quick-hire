import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export interface IUserData {
  id: string;
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token || null;
}

export async function getUserData(): Promise<IUserData | null> {
  const token = await getToken();

  if (!token) {
    return null;
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET environment variable is not defined");
      return null;
    }

    const decoded = jwt.verify(token, secret) as any;

    return { id: decoded.id };
  } catch (error) {
    console.error("Failed to verify user token:", error);
    return null;
  }
}
