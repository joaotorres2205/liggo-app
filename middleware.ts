import { NextResponse, type NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt';

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
    const user = token ? verifyToken(token) : null;
    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/auth';
      const res = NextResponse.redirect(redirectUrl);
      if (token) {
        res.cookies.set('liggo_token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 0,
        });
      }
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*'],
};
