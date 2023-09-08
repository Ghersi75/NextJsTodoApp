import { db } from "@/utils/database"
import { validatePassword } from "@/utils/passwordHashing"

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      return new Response("Invalid content type", {
        status: 400
      });
    }

    let email, username, password 
    try {
      //  Without outside parentheses, this wouldnt work
      ({ email, username, password } = await req.json())
    }
    catch (e) {
      console.log("Error: ", e)
      return new Response("Failed to parse json, please send the correct body format", {
        status: 400
      })
    }

    let res

    // Login with email and password
    if (email && password) {
      res = await db.selectFrom("user").select("user.email").select("user.username").select("user.password").where("email", "=", email).executeTakeFirst()
      if (res === undefined) {
        return new Response(`User with email ${email} not found.`, {
          status: 400
        })
      }
    }

    // Login with username and password
    if (username && password) {
      res = await db.selectFrom("user").select("user.email").select("user.username").select("user.password").where("username", "=", username).executeTakeFirst()
      if (res === undefined) {
        return new Response(`User with username ${username} not found.`, {
          status: 400
        })
      }
    }

    const passwordMatch = res?.password ? await validatePassword(password, res.password) : false

    if (!passwordMatch) {
      return new Response("Password input is not correct", {
        status: 400
      })
    } else {
      return new Response(JSON.stringify({
        username: res?.username,
        email: res?.email
        // any other useful fields, such as profile picture link
      }), {
        status: 200
      })
    }

    // username and email missing, or password missing
    return new Response("Missing email, username, or password", {
      status: 400
    })
  }
  catch (e) {
    console.log("Error: ", e)
    return new Response("Bad Request", {
      status: 400
    })
  }
  
}