"use client"

import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
// import { useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  // const [showBar, setShowBar] = useState(!["/auth/signIn", "/auth/signUp"].includes(pathname))
  // console.log(pathname)
  return(
    <>
      <nav className="fixed top-0 left-0 w-screen z-20 bg-slate-500 h-16 p-2.5 flex items-center justify-center">
        {session?.user && pathname !== "/auth/signIn" && pathname !== "/auth/signUp" && <button className="p-2.5 bg-slate-200 rounded-lg" onClick={() => {signOut()}}>Sign Out</button>}
      </nav> 
    </>
  )
}