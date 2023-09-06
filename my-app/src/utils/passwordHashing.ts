import { hash, genSalt } from "bcrypt"

export const generateSalt = async (saltRounds: number): Promise<string> => {
  return await genSalt(saltRounds)
}

export const hashPassword = async (salt: string, password: string): Promise<string> => {
  // password + salt first, and then pepper
  return await hash(password, salt)
}