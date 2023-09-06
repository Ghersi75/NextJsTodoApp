"use client"

import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai"
import { useState, MouseEvent } from "react"
import { useAtom } from "jotai"
import { todoItemsAtom } from "@/utils/atoms"

export default function AddTask() {
  const [modalOpen, setModalOpen] = useState(false)
  const [newTodo, setNewTodo] = useState("")
  const [todos, setTodos] = useAtom(todoItemsAtom)

  const handleBackgroundOnClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (e.currentTarget.id === "container" && e.target === e.currentTarget) {
      setModalOpen(false)
    }
  }

  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          description: newTodo
        })
      })

      if (!res.ok) {
        throw new Error(`Failed to create new todo`)
      }

      const newItem = await res.json()
      setTodos([...todos, newItem])
    }
    catch (e) {
      console.log("Error: ", e)
    }
    finally {
      setModalOpen(false)
    }
  }

  return(
    <>
      <button className="w-full bg-indigo-700 hover:bg-indigo-600 text-white p-4 rounded-lg font-bold flex flex-row items-center justify-center gap-2"
        onClick={() => {setModalOpen(true)}}>  
        ADD NEW TASK <AiOutlinePlus size={18}/>
      </button>
      {modalOpen ? 
      <div id="container" className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-30 cursor-pointer"
        onClick={handleBackgroundOnClick}>
        <div className="relative flex flex-col justify-center items-center bg-white rounded-lg z-5 cursor-default">
          <div className="absolute top-0 right-0 mr-1 mt-1 cursor-pointer" onClick={() => {setModalOpen(false)}}> <AiFillCloseCircle size={30}/> </div>
          <h1 className="font-bold px-4 pt-4"> Add new task </h1>
          <div className="flex flex-row justify-center items-center w-[100%]">
            <input type="text" placeholder="Type here" className="p-2.5 pr-8 rounded-lg border border-gray-300 ml-4 my-4" 
              onChange={(e) => {setNewTodo(e.target.value)}}/>
            <button className="ml-1 mr-4 bg-slate-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-all duration-300 text-white p-2.5 h-fit rounded-lg font-bold" 
              onClick={handleSubmit} disabled={newTodo === ""}>SUBMIT</button>
          </div>
        </div>
      </div> :
      null
      }
      
    </>
  )
}