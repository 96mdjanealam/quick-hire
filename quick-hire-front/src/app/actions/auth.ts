"use server";

import { cookies } from "next/headers";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const API_URL = process.env.BACKEND_API_URL || "http://localhost:5000";
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.message || "Login failed. Please check your credentials.",
      };
    }

    if (data.token) {
      const cookieStore = await cookies();

      cookieStore.set("token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
        sameSite: "lax",
      });

      return { success: true };
    }

    return { error: "Invalid response from server: No token received." };
  } catch (err) {
    console.error("Login action error:", err);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("token");

  return { success: true };
}
