import { db } from "@/utils/database"
import { hashPassword } from "@/utils/passwordHashing"

export async function POST(req: Request) {
  const { username, email, password } = await req.json()
  try {
    let user: any = await db.selectFrom("user").select("username").where("username", "=", username).executeTakeFirst()
    if (user) {
      return new Response("Username already taken", {
        status: 400
      })
    }
    user = await db.selectFrom("user").select("email").where("email", "=", email).executeTakeFirst()
    if (user) {
      return new Response("Email already taken", {
        status: 400
      })
    }

    // console.log("Here")

    const saltRounds = 12

    console.log("Salt", saltRounds)

    let hashedPass = await hashPassword(password, saltRounds)
    console.log(hashedPass)

    const res = await db.insertInto("user").values({
      username: username,
      email: email,
      password: hashedPass
    }).executeTakeFirstOrThrow()

    console.log(res)
    return new Response("Success", {
      status: 200
    })
  }
  catch (e) {
    console.log("Error: ", e)
    return new Response("Error", {
      status: 400
    })
  }
}