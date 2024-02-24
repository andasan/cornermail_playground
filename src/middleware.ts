import { auth } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest, res: NextResponse) {
	const session = await auth();
	const path = req.nextUrl.pathname;

	const protectedRoutes = ["/dashboard", "/recipients"];

	if (protectedRoutes.includes(path) && !session) {
		return NextResponse.redirect(new URL("/main", req.url));
	}

	if (!session && path === "/") {
		return NextResponse.redirect(new URL("/main", req.url));
	}

	if (session && (path === "/" || path === "/main")) {
		console.log("path", path);
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	return NextResponse.next();
}
