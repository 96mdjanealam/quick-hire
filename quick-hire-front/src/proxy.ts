import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        console.error("JWT_SECRET is not defined");
        return NextResponse.redirect(new URL("/login", request.url));
      }

      jwt.verify(token, secret);

      return NextResponse.next();
    } catch (error) {
      console.error("Proxy: JWT verification failed", error);
      // If verification fails, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
