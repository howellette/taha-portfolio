import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Allow all requests - auth is handled client-side
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
