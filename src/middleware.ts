import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest, res: NextResponse) {
	const session = await auth();
	const path = req.nextUrl.pathname;

	const protectedRoutes = [
		'/dashboard',
		'/recipients',
		'/api/recipient/add-recipient',
		'/api/recipient/create-recipients',
		'/api/recipient/edit-recipient',
	];

	if (protectedRoutes.includes(path) && !session) {
		console.log('Redirecting to login');
		return NextResponse.redirect(new URL('/', req.url));
	}

	if (session && (path === '/' || path === '/')) {
		return NextResponse.redirect(new URL('/dashboard', req.url));
	}

	return NextResponse.next();
}
