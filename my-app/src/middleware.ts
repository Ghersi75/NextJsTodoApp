// This applies next auth to the entire website
export { default } from "next-auth/middleware"

// Config for routes to protect
export const config = {
  matcher: [
    "/extra",
    "/dashboard"
  ]
}