// Docs at https://kysely.dev/docs/getting-started?dialect=mysql

import { Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface Database {
  todo: TodoTable,
  user: UserTable
}

export interface UserTable {
  user_id: Generated<number>
  username: string
  email: string
  password: string
}

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UpdateUser = Updateable<UserTable>
export interface TodoTable {
  todo_id: Generated<number>
  user_id: number
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