import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /dashboard, /profile, /reports, /submit routes
  const protectedRoutes = ['/api/dashboard', '/api/profile', '/api/reports', '/api/submit', '/api/admin'];
  const isProtected = protectedRoutes.some(r => pathname.startsWith(r));

  if (isProtected) {
    const token = request.cookies.get('session')?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    // Token verification happens in individual API routes via verifyAuth
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/dashboard/:path*', '/api/profile/:path*', '/api/reports/:path*', '/api/submit/:path*', '/api/admin/:path*'],
};
