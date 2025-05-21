import type { Todo } from "@/types"

export const setId = (len: number, last?: string): string => {
  return len ? String(last ? (+last + 1) : (len + 1)) : String(1)
}

export const getNotCompletedLen = (todoList: Todo[]): number => {
  return todoList.reduce((acc, item) => !item.completed ? acc + 1 : acc, 0)
}
