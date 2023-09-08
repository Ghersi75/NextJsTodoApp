"use client"

import { useState, FormEvent } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/users/create", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
          email: email
        })
      })

      if (res.ok) {
        signIn("credentials", {
          username: username,
          password: password,
          callbackUrl: "http://localhost:3000"
        })
      }

    }
    catch (e) {
      console.log("Error: ", e)
    }
    

    // signIn("credentials", { username: username, password: password, callbackUrl: "http://localhost:3000" })
  }

  return(
    <div className="flex h-screen w-screen items-center justify-center bg-slate-200">
      <form className="flex flex-col w-auto h-auto bg-slate-300 p-6 gap-2 rounded-lg" onSubmit={onSubmit}>
        <h1 className="font-bold">Create account</h1>
        <label className="ml-2.5">Email: </label>
        <input type="text" placeholder="Username" className="p-2.5 rounded-lg" onChange={(e) => {setEmail(e.target.value)}}/>
        <label className="ml-2.5">Username: </label>
        <input type="text" placeholder="Username" className="p-2.5 rounded-lg" onChange={(e) => {setUsername(e.target.value)}}/>
        <label className="ml-2.5">Password: </label>
        <input type="password" placeholder="Password" className="p-2.5 rounded-lg" onChange={(e) => {setPassword(e.target.value)}}/>
        <button className="bg-slate-600 hover:bg-slate-500 p-4 mt-2 rounded-lg font-bold text-slate-100">Create Account</button>
        <span>Already have an account? <a className="cursor-pointer" onClick={() => {router.push("/auth/signIn")}}>Sign In</a></span>
      </form>
    </div>
  )
}