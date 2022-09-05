import { NextRequest, NextResponse } from "next/server";
import { parse } from "@/lib/middleware/utils";
import { getToken } from "next-auth/jwt";

export default async function AppMiddleware(req: NextRequest) {
  const { path } = parse(req);
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log(session);
  if (!session && path !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && path === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.rewrite(new URL(`/app${path}`, req.url));
}