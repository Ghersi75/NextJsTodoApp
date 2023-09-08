"use client"

import { useState, FormEvent } from "react"
import { signIn } from "next-auth/react"

export default function SignIn() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const res = await signIn("credentials", { username: "user", password: password })
  //   console.log(res)
  //   // console.log("Signed in")
  }

  const onClick = async (e: any) => {
      e.preventDefault()
      const res = await signIn("credentials", { username: "user", password: password, redirect: false })
      console.log(res)
  }



  return(
    <div className="flex h-screen w-screen items-center justify-center bg-slate-200">
      <form className="flex flex-col w-auto h-auto bg-slate-300 p-6 gap-2 rounded-lg" onSubmit={onSubmit}>
        <label className="ml-2.5">Username: </label>
        <input type="text" placeholder="Username" className="p-2.5 rounded-lg" onChange={(e) => {setUsername(e.target.value)}}/>
        <label className="ml-2.5">Password: </label>
        <input type="password" placeholder="Password" className="p-2.5 rounded-lg" onChange={(e) => {setPassword(e.target.value)}}/>
        <button className="bg-slate-600 hover:bg-slate-500 p-4 mt-2 rounded-lg font-bold text-slate-100" onClick={onClick}>Sign In</button>
      </form>
    </div>
  )
}