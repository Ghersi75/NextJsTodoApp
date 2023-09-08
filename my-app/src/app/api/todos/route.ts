import { db } from "@/utils/database"
import { NextResponse } from 'next/server'
import type { NextApiRequest } from 'next'

export async function GET(req: NextApiRequest) {
  const url = new URL(req.url as string).searchParams
  const user_id: number | null = Number(url.get("user_id"))
  const username: string | null = url.get("username")
  
  if (!user_id && !username) {
    return new NextResponse(JSON.stringify({
      error: "No user_id or username provided"
    }), {
      status: 400
    })
  }

  try {
    let todos
    if (user_id) {
      todos = await db.selectFrom("todo").where("user_id", "=", user_id).selectAll().execute()
    } else if (username) {
      const user = await db.selectFrom("user").select("user_id").where("username", "=", username).executeTakeFirst()
      if (!user?.user_id) {
        return new NextResponse(JSON.stringify({
          error: "No user with given username found"
        }), {
          status: 400
        })
      }

      todos = await db.selectFrom("todo").selectAll().where("user_id", "=", user.user_id).execute()
    }
    
    // console.log(todos);
    return new NextResponse(JSON.stringify({
      todos
    }), {
      status: 200
    })
  } catch (error) {
    console.error("Error executing query:", error);
    return new Response("Server error", { status: 500 });
  
  } 
}

export async function POST(request: Request) {
  const { user, todo } = await request.json()
  if (!user || !todo) {
    return new NextResponse(JSON.stringify(
      { 
        error: "User or new Todo missing" 
      }), {
      status: 400,
    })
  }

  // console.log(user, todo)

  try {
    const foundUser = await db.selectFrom("user").select("user_id").where("email", "=", user.email).executeTakeFirst()
    if (!foundUser?.user_id) {
      return new NextResponse(JSON.stringify({
        error: "User with given email does not exist"
      }), {
        status: 400
      })
    }

    const res = await db.insertInto("todo")
      .values({
        description: todo.description,
        is_completed: false, // default value
        user_id: foundUser.user_id
      })
      .executeTakeFirst()

    return new NextResponse(JSON.stringify({
      todo_id: Number(res.insertId), //bigInt to number
      user_id: foundUser.user_id,
      description: todo.description,
      is_completed: false
    }), {
      status: 200
    })
  }
  catch (e) {
    console.log("Error: ", e)
  }
}