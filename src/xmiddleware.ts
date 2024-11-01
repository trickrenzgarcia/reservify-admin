// import { NextResponse, type NextRequest } from "next/server";
// import { auth } from "./lib/auth";

// export async function middleware(request: NextRequest) {
//   const session = await auth();

//   if (!session?.user) {
//     const url = request.nextUrl.clone();
//     url.pathname = "/login";
//     return NextResponse.rewrite(url);
//   }

//   return NextResponse.next();
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/admin", "/admin/:path*"],
// };
