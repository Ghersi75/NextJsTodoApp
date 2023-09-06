import { db } from "@/utils/database"

export async function PATCH(request: Request, { params }: { params : { todo_id: number }}) {
  try {
    const data = await request.json()
    const todo_id = params.todo_id
    // console.log(data, todo_id)
    if (data.is_completed !== undefined) {
      const res = await db.updateTable("todo")
        .set({
          is_completed: data.is_completed
        })
        .where("todo_id", "=", todo_id)
        .execute()
        // console.log(res)
    }

    if (data.description) {
      const res = await db.updateTable("todo")
        .set({
          description: data.description
        })
        .where("todo_id", "=", todo_id)
        .execute()
        // console.log(res)
      }
    
    // console.log(params.todo_id)
    return new Response("", {
      status: 200
    })
  }
  catch(e) {
    console.log("Error: ", e)
  }
}

export async function DELETE(request: Request, { params }: { params : { todo_id: number }}) {
  try {
    const todo_id = params.todo_id
    const res = await db.deleteFrom("todo")
      .where("todo.todo_id", "=", todo_id)
      .execute()
    // console.log(params.todo_id)
    return new Response("", {
      status: 200
    })
  }
  catch(e) {
    console.log("Error: ", e)
  }
}