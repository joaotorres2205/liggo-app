import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/auth', '/auth/login-password', '/api/auth'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next/') || pathname.startsWith('/favicon.ico') || pathname.match(/\.(.*)$/)) {
    return NextResponse.next();
  }

  if (PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'))) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/app')) {
    const token = request.cookies.get('liggo_token')?.value;
    if (!token) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/auth';
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*'],
};
