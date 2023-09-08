"use client"

import { useState, FormEvent } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const res = await signIn("credentials", { username: "user", password: password })
  //   console.log(res)
  //   // console.log("Signed in")
  }

  const onClick = async (e: any) => {
      e.preventDefault()
      const res = await signIn("credentials", { username: username, password: password, redirect: false })
      if (res?.ok) {
        router.push("/")
      }
  }



  return(
    <div className="flex h-screen w-screen items-center justify-center bg-slate-200">
      <form className="flex flex-col w-auto h-auto bg-slate-300 p-6 gap-2 rounded-lg" onSubmit={onSubmit}>
        <label className="ml-2.5">Username: </label>
        <input type="text" placeholder="Username" className="p-2.5 rounded-lg" onChange={(e) => {setUsername(e.target.value)}}/>
        <label className="ml-2.5">Password: </label>
        <input type="password" placeholder="Password" className="p-2.5 rounded-lg" onChange={(e) => {setPassword(e.target.value)}}/>
        <button className="bg-slate-600 hover:bg-slate-500 p-4 mt-2 rounded-lg font-bold text-slate-100" onClick={onClick}>Sign In</button>
        <span>Don't have an account? <a className="cursor-pointer" onClick={() => {router.push("/auth/signUp")}}>Sign Up</a></span>
        <button onClick={(e) => {e.preventDefault(); signIn("google")}}>Sing in with google</button>
      </form>
    </div>
  )
}