
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ratelimit = new Map();

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const limit = 5; // Max requests
  const windowMs = 10 * 1000;

  if (!ratelimit.has(ip)) {
    ratelimit.set(ip, { count: 0, lastReset: Date.now() });
  }

  const ipData = ratelimit.get(ip);

  if (Date.now() - ipData.lastReset > windowMs) {
    ipData.count = 0;
    ipData.lastReset = Date.now();
  }

  ipData.count++;

  if (ipData.count > limit) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)],
};
