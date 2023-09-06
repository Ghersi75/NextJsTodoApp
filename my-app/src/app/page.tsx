"use client";

import { darkModeAtom } from "@/utils/atoms"
import { useAtom } from 'jotai'
import AddTask from '@/app/_components/AddTask';
import TodoList from "@/app/_components/TodoList"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import type { Session } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default function Home() {
  // Require login and send to any url if not authenticated
  const { data: session } = useSession(
    // {
    // required: true,
    // onUnauthenticated() {
    //   redirect("/auth/signin")
    // }
  // }
  )
  console.log(session)
  const [darkMode, setDarkMode] = useAtom(darkModeAtom)
  // const [session, setSession] = useState<Session | null>()
  
  return (
    <main className={`max-w-4xl mx-auto mt-20 ${darkMode ? "dark" : ""}`}>
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl text-bold">Todo List App</h1>
        {
          session?.user ? 
          <h1> Logged in as {session?.user?.name}</h1> :
          <h1> Nope </h1>
        }
        <AddTask />
        <TodoList />
      </div>
    </main>
  )
}
