import { db } from "@/utils/database"

export async function GET(request: Request) {
  try {
    const todos = await db.selectFrom("todo").selectAll().execute()
    
    // console.log(todos);
    return new Response(JSON.stringify(todos));
  } catch (error) {
    console.error("Error executing query:", error);
    return new Response("Server error", { status: 500 });
  
  } 
}

export async function POST(request: Request) {
  const data = await request.json()
  if (!data.description) {
    return new Response(JSON.stringify({ message: "Bad request, description not found" }), {
      status: 400,
    })
  }


  try {
    const res = await db.insertInto("todo")
      .values({
        description: data.description,
        is_completed: false // default value
      })
      .executeTakeFirst()

    return new Response(JSON.stringify({
      todo_id: Number(res.insertId), //bigInt to number
      description: data.description,
      is_completed: false
    }), {
      status: 200
    })
  }
  catch (e) {
    console.log("Error: ", e)
  }
}