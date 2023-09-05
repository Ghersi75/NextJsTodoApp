import { atom } from "jotai"
import { todoItemsType } from "@/types/DatabaseTypes"

export const darkModeAtom = atom<boolean>(false)
export const todoItemsAtom = atom<todoItemsType[]>([])
