import { hash, compare } from "bcrypt"

export const hashPassword = async (password: string, saltRounds: number): Promise<string> => {
  // password + salt first, and then pepper
  return await hash(password, saltRounds)
}

export const validatePassword = async (plainTextPassword: string, hashedPassword: string): Promise<boolean> => {
  return await compare(plainTextPassword, hashedPassword)
}