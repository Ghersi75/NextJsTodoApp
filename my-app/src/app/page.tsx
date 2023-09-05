"use client";

import { darkModeAtom } from "@/utils/atoms"
import { useAtom } from 'jotai'
import AddTask from '@/components/AddTask';
import TodoList from "@/components/TodoList"

export default function Home() {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom)

  return (
    <main className={`max-w-4xl mx-auto mt-4 ${darkMode ? "dark" : ""}`}>
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl text-bold">Todo List App</h1>
        <AddTask />
        <TodoList />
      </div>
    </main>
  )
}
