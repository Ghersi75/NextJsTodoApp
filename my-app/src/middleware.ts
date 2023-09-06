// This applies next auth to the entire website
export { default } from "next-auth/middleware"

// Config for routes to protect
export const config = {
  matcher: [
    // "/extra",
    // "/dashboard"
    // Don't block auth/signIn or auth/
    "/",
    // "/((?!/auth/signIn|/auth/signOut).*)"
  ],
  pages: {
    "signIn": "/auth/signIn"
  },
  // secret: (process.env.NEXTAUTH_SECRET as string)
}

export { }