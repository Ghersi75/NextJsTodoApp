// Docs at https://kysely.dev/docs/getting-started?dialect=mysql

import { Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface Database {
  todo: TodoTable
}

export interface TodoTable {
  todo_id: Generated<number>
  is_completed: boolean
  description: string
}

export type Todo = Selectable<TodoTable>
export type NewTodo = Insertable<TodoTable>
export type UpdateTodo = Updateable<TodoTable>


// Type used for jotai store
export type todoItemsType = {
  todo_id: number,
  is_completed: boolean,
  description: string
}