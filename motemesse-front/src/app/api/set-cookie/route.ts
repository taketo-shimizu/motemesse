import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  const redirectTo = searchParams.get("redirectTo") || "/chat";
  
  if (userId) {
    const cookieStore = await cookies();
    cookieStore.set("userId", userId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1年
      sameSite: "lax",
    });
  }
  
  return NextResponse.redirect(new URL(redirectTo, request.url));
}

