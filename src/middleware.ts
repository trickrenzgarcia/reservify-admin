import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  console.log("This is a middleware");
  const session = await auth();
  console.log("Session: ", session);
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*"],
};
