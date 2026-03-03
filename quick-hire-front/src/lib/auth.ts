import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export interface IUserData {
  id: string;
}

/**
 * Retrieves the token from cookies.
 * @returns The token string or null if not found.
 */
export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token || null;
}

/**
 * Verifies a JWT token using the secret.
 * @param token The JWT token to verify.
 * @returns The decoded payload or null if verification fails.
 */
export function verifyToken(token: string): any {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET environment variable is not defined");
      return null;
    }

    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

export async function getUserData(): Promise<IUserData | null> {
  const token = await getToken();

  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);

  if (!decoded || typeof decoded !== "object" || !decoded.id) {
    return null;
  }

  return { id: decoded.id };
}
