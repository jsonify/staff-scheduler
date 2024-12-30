// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Check if user is authenticated for /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // You can add more complex auth checks here
    const authSession = request.cookies.get('appwrite_session')
    
    if (!authSession) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  return NextResponse.next()
}
 
export const config = {
  matcher: '/admin/:path*'
}