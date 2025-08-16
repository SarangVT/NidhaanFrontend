import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Get the token from cookies (or headers)
  const token = req.cookies.get("authToken")?.value;

  // Define protected paths
  const protectedPaths = ["/dashboard", "/profile"];

  if (protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Optionally: validate token (JWT, session check, etc.)
    // if (!isValid(token)) return NextResponse.redirect(loginUrl);
  }

  // Allow access
  return NextResponse.next();
}

// Specify which paths middleware should run on
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // all protected routes
};
