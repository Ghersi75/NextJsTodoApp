"use client";

import { ChangeEvent, MouseEvent, MouseEventHandler, useEffect, useState } from "react"
import { BsPencilSquare, BsTrash } from "react-icons/bs"
import { AiFillCloseCircle } from "react-icons/ai"
import { useAtom } from "jotai"
import { todoItemsAtom } from "@/utils/atoms"

export default function TodoList() {
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [newDescription, setNewDescription] = useState("")
  const [modifyingTodoId, setModifyingTodoId] = useState<number>()
  const [todos, setTodos] = useAtom(todoItemsAtom)

  const fetchData = async () => {
    try {
      const res = await fetch("/api/todos")
      const todoData = await res.json()
      // console.log(todoData)
      setTodos(todoData)
      setLoading(false)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCheckBox = async (e: ChangeEvent<HTMLElement>, id: number) => {
    let currVal
    const newTodos = todos.map(todo => {
      if (todo.todo_id === id) {
        currVal = todo.is_completed
        return { ...todo, is_completed: !todo.is_completed }; // or whatever update you need
      }
      return todo
    })

    setTodos(newTodos)

    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          is_completed: !currVal
        })
      })

      if (!res.ok) {
        throw new Error(`Failed to update is_completed for field for todo_id ${id}`)
      }
    }
    catch (e) {
      console.log("Error: ", e)

      fetchData()
    }
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const newTodos = todos.map(todo => {
      if (todo.todo_id === modifyingTodoId) {
        return { ...todo, description: newDescription }; // or whatever update you need
      }
      return todo
    })

    setTodos(newTodos)

    try {
      const res = await fetch(`/api/todos/${modifyingTodoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          description: newDescription
        })
      })

      if (!res.ok) {
        throw new Error(`Failed to update is_completed for field for todo_id ${modifyingTodoId}`)
      }


    }
    catch (e) {
      console.log("Error: ", e)

      fetchData()
    }
    finally {
      setModalOpen(false)
    }
  }

  const handleBackgroundOnClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (e.currentTarget.id === "container" && e.target === e.currentTarget) {
      setModalOpen(false)
    }
  }

  const handleDelete = async (e: MouseEvent<SVGElement, globalThis.MouseEvent>, id: number) => {
    const res = todos.filter(todo => {
      if (todo.todo_id !== id) {
        // return { ...todo, is_completed: !todo.is_completed }; // or whatever update you need
        return todo
      }
      // return todo
    })
    // console.log(res)
    setTodos(res)

    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error(`Failed to update is_completed for field for todo_id ${id}`)
      }
    }
    catch(e) {
      console.log("Error: ", e)

      fetchData()
    }
  }

  const topRowCss = `bg-slate-300 font-bold`

  return(
    <>
    {modalOpen ? 
      <div id="container" className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-black bg-opacity-30 cursor-pointer"
        onClick={handleBackgroundOnClick}>
        <div className="relative flex flex-col justify-center items-center bg-white rounded-lg z-5 cursor-default">
          <div className="absolute top-0 right-0 mr-1 mt-1 cursor-pointer" onClick={() => {setModalOpen(false)}}> <AiFillCloseCircle size={30}/> </div>
          <h1 className="font-bold px-4 pt-4"> Modify task </h1>
          <div className="flex flex-row justify-center items-center w-[100%]">
            <input type="text" placeholder="Enter new description" className="p-2.5 pr-8 rounded-lg border border-gray-300 ml-4 my-4" 
              onChange={(e) => {setNewDescription(e.target.value)}}/>
            <button className="ml-1 mr-4 bg-slate-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-all duration-300 text-white p-2.5 h-fit rounded-lg font-bold" 
              onClick={handleSubmit} disabled={newDescription === ""}>SUBMIT</button>
          </div>
        </div>
      </div> :
      null
    }
    {loading ? 
      <div>Loading ...</div> :
      todos.length > 0 &&
      <table className="text-left rounded-lg ">
        <thead>
          <tr>
          <td className={`rounded-tl-lg w-[80%] p-3 ${topRowCss}`}>
            TASK NAME
          </td>
          <td className={`rounded-tr-lg w-[20%] ${topRowCss}`}>
            ACTIONS
          </td>
        </tr>
        </thead>
        <tbody>
        {todos.map((item, index) => {
          return(
            <tr className="odd:bg-slate-100 even:bg-slate-50" key={item.todo_id}>
              <td className={`w-[80%] p-3 transition-all duration-500 ${item.is_completed ? "line-through	text-slate-500" : ""} ${index === todos.length - 1 ? "rounded-bl-lg" : ""}`}>
              {item.description} 
              </td>
              <td className={`w-[20%] ${index === todos.length - 1 ? "rounded-br-lg" : ""}`}>
                <div className="flex flex-row gap-4">
                  <input type="checkbox" className="w-[18px] h-[18px] cursor-pointer" checked={item.is_completed} onChange={(e) => { handleCheckBox(e, item.todo_id) }}/>
                  <BsPencilSquare size={18} className="cursor-pointer" color="#1d4ed8" onClick={() => {setModalOpen(true); setModifyingTodoId(item.todo_id)}}/> 
                  <BsTrash size={18} className="cursor-pointer" color="#ef4444" onClick={(e) => { handleDelete(e, item.todo_id) }}/>
                </div>
                
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    }
    </>
    
  )
}