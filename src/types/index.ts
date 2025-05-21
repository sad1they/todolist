export type TodoCondition = 'All' | 'Active' | 'Completed'

export const TODO_CONDITION_VALUES = {
  ALL: 'All',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
} as const

export interface Todo {
  id: string
  text: string
  completed: boolean
}