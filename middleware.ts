// middleware.ts
export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/calendar/:path*", "/settings/:path*"]
}