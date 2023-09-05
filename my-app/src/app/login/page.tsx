import Image from 'next/image'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-tr from-gray-700 via-gray-900 to-black">
      <form className="bg-white flex flex-col p-12 rounded-lg bg-slate-500 gap-2"> 
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-md text-slate-900" >Enter email</label>
          <input type="text" id="email" placeholder="Enter email" className="p-4 rounded-lg"/>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-md text-slate-900">Enter password</label>
          <input type="password" placeholder="Enter password" className="p-4 rounded-lg"/>
        </div>

      </form>
    </main>
  )
}
